<#
.SYNOPSIS
    Tests simulator container.
.DESCRIPTION
    Used for verifying the container.
.INPUTS
    ResourceGroup       - Azure resource group (creates one if one does not exist).
    ContainerName       - This is name of the new container. The simulator url will have this. 
.EXAMPLE
    .\Test-Simulator.ps1 -ResourceGroup simulator -ContainerName testhost
#>

param(
    [parameter(Mandatory=$true)]
    $ResourceGroup,
    [parameter(Mandatory=$true)]
    $ContainerName
)

Import-Module './SimulatorModule'

Login
if( (Test-Container -ResourceGroupName $ResourceGroup -Name $ContainerName ) -eq $false)
{
    Write-Warning "$ContainerName does not exists in $ResourceGroup."
    return
}

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


Write-Host "Verifying..."
Test-SimulatorHost $container.Fqdn
Start-Process "http://$($container.Fqdn)"
