<#
.SYNOPSIS
    Lists all the containers in given resource group.
.DESCRIPTION
    Useful for showing the existing containers after they have been crated.
.INPUTS
    ResourceGroup       - Azure resource group 
.EXAMPLE
    .\Get-Simulator.ps1 -ResourceGroup simulator
#>

param(
    [parameter(Mandatory=$true)]
    $ResourceGroup
)

Import-Module '.\Simulator-Module.psm1'

$Location = 'eastus'

Login

if( (Test-ResourceGroup -Name $ResourceGroup -Location $Location) -eq $false){
    Write-Warning "$ResourceGroup does not exists."
    return
}

Get-AzureRmContainerGroup -ResourceGroupName $ResourceGroup | Select-Object ProvisioningState, Name, @{Name="Url";Expression = {"http://" + $_.Fqdn} }
