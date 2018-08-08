<#
.SYNOPSIS
    Gets simulator log files.
.DESCRIPTION
    Useful for troubleshooting container instances.
.INPUTS
    ResourceGroup       - Azure resource group.
    ContainerName       - Container name.
.EXAMPLE
    .\Get-SimulatorLogs.ps1 -ResourceGroup simulator -ContainerName testhost
#>
param(
    [parameter(Mandatory = $true)]
    $ResourceGroup,
    [parameter(Mandatory = $true)]
    $ContainerName
)

Import-Module '.\Simulator-Module.psm1'
Login

if( (Test-Container -ResourceGroupName $ResourceGroup -Name $ContainerName ) -eq $false)
{
    Write-Warning "$ContainerName does not exists in $ResourceGroup."
    return
}

Get-AzureRmContainerInstanceLog -ResourceGroupName $ResourceGroup -ContainerGroupName $ContainerName 
