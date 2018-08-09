<#
.SYNOPSIS
    Removes a mongo db for simulator to use.
.DESCRIPTION
.INPUTS
    ResourceGroup       - Azure resource group (creates one if one does not exist).
    Name                - This is name of the new mongodb account.
.EXAMPLE
    .\Remove-Mongodb.ps1 -ResourceGroup simulator -Name testhost
#>

param(
    [parameter(Mandatory = $true)]
    $ResourceGroup,
    [parameter(Mandatory = $true)]
    $Name        
)

Import-Module '.\Simulator-Module.psm1'
$Location = 'eastus'

Login

<# Check whether exists.#>
$resource = Get-AzureRmResource -ResourceGroupName $ResourceGroup -ResourceType Microsoft.DocumentDb/databaseAccounts -Name $Name
if( $null -ne $resource){
    Write-Warning "$Name does not exist."
    return
}

Remove-AzureRmResource -ResourceGroupName $ResourceGroup -ResourceType Microsoft.DocumentDb/databaseAccounts -Name $Name -Force
 
