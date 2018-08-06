param(
    [parameter(Mandatory=$true)]
    $ResourceGroup
)

Import-Module '.\SimulatorModule.psm1'

$Location = 'eastus'
$ValutName = 'simulator-valut'
$User = 'uservalue here'
$Password = 'password value here'

Login

if( (Test-ResourceGroup -Name $ResourceGroup -Location $Location) -eq $false )
{
    Write-Warning "$ResourceGroup not found."
    return
}

if( (Test-ValutExists -Name $valutName) -eq $false){
    Write-Warning "$ValutName not found creating."
        New-AzureRmKeyVault -Name $ValutName -ResourceGroupName $ResourceGroup -Location $Location
}

Write-Host 'Setting user and password.'
$Secret = ConvertTo-SecureString -String $User -AsPlainText -Force
Set-AzureKeyVaultSecret -VaultName $ValutName -Name "User" -SecretValue $Secret
$Secret = ConvertTo-SecureString -String $Password -AsPlainText -Force
Set-AzureKeyVaultSecret -VaultName $ValutName -Name "Password" -SecretValue $Secret
 
