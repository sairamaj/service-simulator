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
