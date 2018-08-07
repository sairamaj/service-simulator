<#
.SYNOPSIS
    Creates New Service Simulator Azure Container 
.DESCRIPTION
    New Service simulator azure container from the image sairamaj/servicesimulator:v1. For more information about this simulator visit https://github.com/sairamaj/service-simulator
.INPUTS
    ResourceGroup       - Azure resource group (creates one if one does not exist).
    ContainerName       - This is name of the new container. The simulator url will have this. 
.EXAMPLE
    .\New-Simulator.ps1 -ResourceGroup simulator -ContainerName testhost

    - Creates the simulator host and url is availbale at : http://testhost.eastus.azurecontainer.io
    - Verfies by running /api/v1/admin/services
    - Open the dashboard
#>
param(
    [parameter(Mandatory=$true)]
    $ResourceGroup,
    [parameter(Mandatory=$true)]
    $ContainerName
)

Import-Module './SimulatorModule'

$Location = 'eastus'

Login

if( (Test-ResourceGroup -Name $ResourceGroup -Location $Location) -eq $false){
    Write-Warning "$ResourceGroup does not exists, creating new one."
    $resourceGroup = New-AzureRmResourceGroup -Name $ResourceGroup -Location $Location
    Write-Host "Created successfully $ResourceGroup"
}

if( (Test-Container -ResourceGroupName $ResourceGroup -Name $ContainerName ) -eq $true)
{
    Write-Warning "$ContainerName exists in $ResourceGroup."
    return
}

New-AzureRmContainerGroup -ResourceGroupName $ResourceGroup -Name $ContainerName -Image sairamaj/servicesimulator:v1 -DnsNameLabel $ContainerName | Out-Null
Write-Host "$ContainerName created. Checking the status."

# Check the container status periodically for success status
do{
    Write-Host 'Checking ....'
    $container = Get-AzureRmContainerGroup -ResourceGroupName $ResourceGroup -Name $ContainerName
    Write-Progress "$ContainerName is in  $($container.State)"
    
    if( $container.State -eq 'Running'){
        break
    }

    Start-Sleep -Seconds 10
}while($true)


Write-Host "Verifying... $($container.Fqdn)"
Test-SimulatorHost $container.Fqdn
Write-Host "Open the dashboard."
Start-Process "http://$($container.Fqdn)"

