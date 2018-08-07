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
