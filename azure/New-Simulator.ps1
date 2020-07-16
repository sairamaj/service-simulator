<#
.SYNOPSIS
    Creates New Service Simulator Azure Container 
.DESCRIPTION
    New Service simulator azure container from the image sairamaj/servicesimulator:v23 For more information about this simulator visit https://github.com/sairamaj/service-simulator

    - Creates the simulator host and url is availbale at : http://testhost.eastus.azurecontainer.io
    - Verfies by running /api/v1/admin/services
    - Open the dashboard
.INPUTS
    ResourceGroup       - Azure resource group (creates one if one does not exist).
    ContainerName       - This is name of the new container. The simulator url will have this.
    MongoDbAccountName  - Optional - Mongodb account name. If not given provider will be in memory and if given mongodb
                          connection string will be retrieved and container will be configured using mongo provider.
                          (Note: Mongo database should exists)
.EXAMPLE
    .\New-Simulator.ps1 -ResourceGroup simulator -ContainerName testhost
    .\New-Simulator.ps1 -ResourceGroup simulator -ContainerName testhost -MongoDbAccountName testdb
#>
param(
    [parameter(Mandatory = $true)]
    $ResourceGroup,
    [parameter(Mandatory = $true)]
    $ContainerName,
    $MongoDbAccountName
)
Import-Module '.\Simulator-Module.psm1'

Function Test-SimulatorInitialize {
    param(
        [parameter(Mandatory = $true)]
        $HostName
    )
    $tries = 0
    do {
        try {
            $tries++
            Write-Progress "Checking $HostName Try:$tries"
            Test-SimulatorHost $HostName  
            break          
        }
        catch {
            Write-Warning $_.Exception.Message
            Show-Logs -ResourceGroup $ResourceGroup -ContainerName $ContainerName  
        }

        if ( $tries -ge 5) {
            Write-Warning "Tried $($tries) and gettting logs."
            $false
        }

        Start-Sleep -Seconds 10
    }while ($true)

    $true
}

Function Test-ContainerForRunning {
    # Check the container status periodically for success status
    $tries = 0
    $status = $false
    do {
        Write-Host 'Checking ....'
        $tries++
        $container = Get-AzContainerGroup -ResourceGroupName $ResourceGroup -Name $ContainerName
        Write-Progress "$ContainerName is in $($container.State) Try: $tries"
        Write-Host "State: $($container.State)"
        if ( $container.State -eq 'Running') {
            $status = $true
            break
        }

        if ( $tries -gt 15) {
            break
        }

        Start-Sleep -Seconds 10
    }while ($true) 
    
    Write-Host 'Status : $status'
    $status
}

Function New-Container {
    
    $mongodbConnectionString = $null
    <# If mongodb is given then get mongodb connection#>
    if ( $null -ne $MongoDbAccountName) {
        $MongoDatabaseName = 'simulator'
    
        if ( !(Test-Mongodb -ResourceGroup $ResourceGroup -Name $MongoDbAccountName)) {
            Write-Error "No mongodb account '$MongoDbAccountName' found. add using .\New-MongoDb -ResourceGroup $ResourceGroup $Name $MongoDbAccountName"
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
    else {
        $environment['PROVIDER'] = 'inmemory'
    }
    
    # Create container
    Write-Host "$ContainerName Creating $ContainerName."
    $container = New-AzContainerGroup -ResourceGroupName $ResourceGroup `
        -Name $ContainerName -Image sairamaj/servicesimulator:v10 `
        -DnsNameLabel $ContainerName `
        -EnvironmentVariable $environment -ErrorAction Stop
    $container
}

$Location = 'eastus'
Login

if ( (Test-ResourceGroup -Name $ResourceGroup -Location $Location) -eq $false) {
    Write-Warning "$ResourceGroup does not exists, creating new one."
    $newGroup = New-AzResourceGroup -Name $ResourceGroup -Location $Location
    Write-Host "Created successfully $($newGroup.ResourceGroupName)"
}

if ( (Test-Container -ResourceGroupName $ResourceGroup -Name $ContainerName ) -eq $fasle) {
    Write-Warning "$ContainerName exists in $ResourceGroup."
    return
}

# Create container
$container = New-Container
if( $null -eq $container){
    return
}

Write-Host "$ContainerName created. Checking the status."
if ( !(Test-ContainerForRunning)) {
    Write-Error "Container could not start properly."
    return
}

Write-Host "Verifying... $($container.IpAddress)"
$container = Get-AzContainerGroup -ResourceGroupName $ResourceGroup -Name $ContainerName
if ( (Test-SimulatorInitialize -Host $container.IpAddress) -eq $true ) {
    Write-Host "Open the dashboard."
    Start-Process "http://$($container.IpAddress)"
}
Write-Host "You can use with DNS entry... $($container.Fqdn)"

