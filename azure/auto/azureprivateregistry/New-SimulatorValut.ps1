param(
    [parameter(Mandatory=$true)]
    $ResourceGroup
)
# Get credentials
$ValutName = 'service-simulator'
$UserNameKeyName = 'service-simulator-pull-user'
$PasswordKeyName = 'service-simulator-pull-password'
$SimulatorImage = 'servicesimulatorregistry.azurecr.io/testing/simulator:latest'
$DnsName = 'service-simulator'
$ValutName = 'servicesimulator-vault'
$UserNameKeyName = 'servicesimulator-pull-usr'
$PasswordKeyName = 'servicesimulator-pull-pwd'

Write-Host "Retrieving $UserNameKeyName from $ValutName"
try {
    $user = (Get-AzureKeyVaultSecret -VaultName $ValutName -Name $UserNameKeyName -ErrorAction Stop).SecretValueText
    if ($null -eq $user) {
        Write-Warning "'$UserNameKeyName' either empty or not found in '$ValutName', exiting."
        return
    }
    Write-Host "User: $user"       
}
catch {
    Write-Warning "Need a '$UserNameKeyName' in '$ValutName' to access container,Error:$_.Exception.Message, exiting."
    return
}
    
Write-Host "Retrieving $PasswordKeyName from $ValutName"
$password = (Get-AzureKeyVaultSecret -VaultName $ValutName -Name $PasswordKeyName).SecretValueText
if ($null -eq $password) {
    Write-Warning "'$PasswordKeyName' either empty or not found in '$ValutName', exiting."
    return
}

Write-Host 'Creating Container'
try {
    $secpasswd = ConvertTo-SecureString $password -AsPlainText -Force
`   $cred = New-Object System.Management.Automation.PSCredential ($user, $secpasswd)

    New-AzureRmContainerGroup -ResourceGroupName $ResourceGroup `
        -Name service-simulator -Image $SimulatorImage `
        -DnsNameLabel $DnsName `
        -RegistryCredential $cred 
        
    Write-Host 'Created Container successfully.'
}
catch {
    Write-Warning "Error in creating container with image:'$SimulatorImage', Error: exiting:"
    $_.Exception.Message
}
