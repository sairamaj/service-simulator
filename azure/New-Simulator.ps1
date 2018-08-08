<#
.SYNOPSIS
    Creates New Service Simulator Azure Container 
.DESCRIPTION
    New Service simulator azure container from the image sairamaj/servicesimulator:v1. For more information about this simulator visit https://github.com/sairamaj/service-simulator
.INPUTS
    ResourceGroup       - Azure resource group (creates one if one does not exist).
    ContainerName       - This is name of the new container. The simulator url will have this.
    MongoDbAccountName  - Optional - Mongodb account name. If not given provider will be in memory and if given mongodb
                          connection string will be retrieved and container will be configured using mongo provider.
                          (Node: Mongo database should exists)
.EXAMPLE
    .\New-Simulator.ps1 -ResourceGroup simulator -ContainerName testhost
    .\New-Simulator.ps1 -ResourceGroup simulator -ContainerName testhost -MongoDbAccountName testdb

    - Creates the simulator host and url is availbale at : http://testhost.eastus.azurecontainer.io
    - Verfies by running /api/v1/admin/services
    - Open the dashboard
#>
param(
    [parameter(Mandatory = $true)]
    $ResourceGroup,
    [parameter(Mandatory = $true)]
    $ContainerName,
    $MongoDbAccountName
)

Import-Module '.\Simulator-Module.psm1'

$Location = 'eastus'

Login

if ( (Test-ResourceGroup -Name $ResourceGroup -Location $Location) -eq $false) {
    Write-Warning "$ResourceGroup does not exists, creating new one."
    $newGroup = New-AzureRmResourceGroup -Name $ResourceGroup -Location $Location
    Write-Host "Created successfully $newGroup"
}

if ( (Test-Container -ResourceGroupName $ResourceGroup -Name $ContainerName ) -eq $true) {
    Write-Warning "$ContainerName exists in $ResourceGroup."
    return
}

$mongodbConnectionString = $null
<# If mongodb is given then get mongodb connection#>
if ( $null -ne $MongoDbAccountName) {
    $MongoDatabaseName = 'simulator'

    if ( (Test-Mongodb -ResourceGroup $ResourceGroup -Name $MongoDbAccountName) -eq $false ) {
        Write-Error "No mongodb account '$MongoDbAccountName' found"
        return
    }

    # Get connection string
    $connectionStringWithoutDb = Get-MongoDbConnection -ResourceGroup $ResourceGroup -Name $MongoDbAccountName
    # Add database name
    $mongodbConnectionString = Add-DatabaseNameToMonDbConnectionString -ConnectionString $connectionStringWithoutDb -Database $MongoDatabaseName
}

$environment = @{}
if ( $null -ne $mongodbConnectionString) {
    Write-Host "Creating with mongo provider"
    $environment['PROVIDER'] = 'mongo'
    $environment['MONGODB_CONNECTION'] = $mongodbConnectionString
}

# Create container
Write-Host "$ContainerName Creating $ContainerName."
New-AzureRmContainerGroup -ResourceGroupName $ResourceGroup `
    -Name $ContainerName -Image sairamaj/servicesimulator:v1 `
    -DnsNameLabel $ContainerName `
    -EnvironmentVariable $environment  | Out-Null

Write-Host "$ContainerName created. Checking the status."


# Check the container status periodically for success status
do {
    Write-Host 'Checking ....'
    $container = Get-AzureRmContainerGroup -ResourceGroupName $ResourceGroup -Name $ContainerName
    Write-Progress "$ContainerName is in $($container.State)"
    
    if ( $container.State -eq 'Running') {
        break
    }

    Start-Sleep -Seconds 10
}while ($true)

$waitForServiceToInitialize = 20
Write-Host "Waiting for $waitForServiceToInitialize for service to get fully initialize."
Start-Sleep -Seconds $waitForServiceToInitialize

Write-Host "Verifying... $($container.Fqdn)"
Test-SimulatorHost $container.Fqdn
Write-Host "Open the dashboard."
Start-Process "http://$($container.Fqdn)"

