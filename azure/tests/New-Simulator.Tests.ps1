Describe 'New-Simulator' {
    It 'Should have the rest api services'{
        $resourceGroup = 'IntegrationTest'
        try {
            $containerName = 'test1'
            .\New-Simulator.ps1 -ResourceGroup $resourceGroup -ContainerName $containerName
            $container = Get-AzureRmContainerGroup -ResourceGroupName $ResourceGroup -Name $containerName
            # $url = "http://$containerName.eastus.azurecontainer.io/api/v1/admin/services"
            $url = "http://$($container.IpAddress)/api/v1/admin/services"
            $services = Invoke-RestMethod $url
            $services.count | Should -Be 8
        }
        finally {
            Write-Host "Cleaning up the resource group."
            Remove-AzureRmResourceGroup -ResourceGroupName $resourceGroup -Force           
        }
    }
}