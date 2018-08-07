param(
    [parameter(Mandatory=$true)]
    $ResourceGroup
)


Import-Module './SimulatorModule'

$Location = 'eastus'

Login

if( (Test-ResourceGroup -Name $ResourceGroup -Location $Location) -eq $false){
    Write-Warning "$ResourceGroup does not exists."
    return
}

Get-AzureRmContainerGroup -ResourceGroupName $ResourceGroup | select ProvisioningState, Name, @{Name="Url";Expression = {"http://" + $_.Fqdn} }