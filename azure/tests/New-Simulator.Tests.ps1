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

    It 'Should configure with mongo'{
        $resourceGroup = 'IntegrationTest'
        try {
            $containerName = 'test1'
            $mongodbAccountName = 'servicetestmongo'
            # Create mongo
            .\New-MongoDb.ps1 -ResourceGroup $resourceGroup -Name $mongodbAccountName
            .\New-Simulator.ps1 -ResourceGroup $resourceGroup -ContainerName $containerName -MongoDbAccountName $mongodbAccountName
            $container = Get-AzureRmContainerGroup -ResourceGroupName $ResourceGroup -Name $containerName
            # $url = "http://$containerName.eastus.azurecontainer.io/api/v1/admin/services"
            $url = "http://$($container.IpAddress)/api/v1/admin/services"
            $services = Invoke-RestMethod $url
            $services.count | Should -Be 0      # default mongodb does not have any.
        }
        finally {
            Write-Host 'Removing Mongodb'
            .\Remove-MongoDb.ps1 -ResourceGroup $resourceGroup -Name $mongodbAccountName
            Write-Host "Cleaning up the resource group."
            Remove-AzureRmResourceGroup -ResourceGroupName $resourceGroup -Force           
        }
    }

}