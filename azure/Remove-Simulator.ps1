<#
.SYNOPSIS
    Removes service simulator azure container.
.DESCRIPTION
    Removes the service given simulator.
.INPUTS
    ResourceGroup       - Azure resource group (creates one if one does not exist).
    ContainerName       - This is name of the new container. The simulator url will have this. 
.EXAMPLE
    .\Remove-Simulator.ps1 -ResourceGroup simulator -ContainerName testhost

    - Removes the simulator host.
#>
param(
    [parameter(Mandatory=$true)]
    $ResourceGroup,
    [parameter(Mandatory=$true)]
    $ContainerName
)

Import-Module './SimulatorModule'
Login

if( (Test-Container -ResourceGroupName $ResourceGroup -Name $ContainerName ) -eq $true)
{
    Remove-AzureRmContainerGroup -ResourceGroupName $ResourceGroup -Name $ContainerName -ErrorAction Stop
    Write-Host "$ContainerName removed successfully." -ForegroundColor Green
}
else 
{
    Write-Warning "$ContainerName does not exist."
}
