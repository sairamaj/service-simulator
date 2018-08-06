param(
    [parameter(Mandatory=$true)]
    $ResourceGroup
)

Import-Module '.\SimulatorModule.psm1'

$Location = 'eastus'        # container registry available only some regions as of now.
$RegistryName = $ResourceGroup + 'Registry'

Login
Write-Host "Checking Resource Group $ResourceGroup"
if( (Test-ResourceGroup -Name $ResourceGroup -Location $Location) -eq $false )
{
    Write-Warning "$ResourceGroup not found, creating one."
    New-AzureRmResourceGroup -Name $ResourceGroup -Location $Location
    Write-Host "$ResourceGroup created."
}
else{
    Write-Host "$ResourceGroup exists" -ForegroundColor Green
}

Write-Host 'Checking Container Registry Exists or not'
if( (Test-ContainerRegistry -ResourceGroup $ResourceGroup -Name $RegistryName) -eq $true)
{
    Write-Warning "$RegistryName already exists."
    return
}

Write-Host 'Creating $RegistryName'
New-AzureRmContainerRegistry -ResourceGroupName $ResourceGroup -Name $RegistryName -Location $Location -Sku Standard
Write-Host 'Created $RegistryName Successfully' -ForegroundColor Green





