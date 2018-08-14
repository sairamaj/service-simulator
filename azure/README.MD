# Creating Service Simulator in Azure container environment

## New-Simulator

Create new simulator by running the powershell command

## Install Azure module
Open powershell in administrator mode
```powershell
    Install-Module -Name AzureRM
```
For Azure powershell module refer [here](https://docs.microsoft.com/en-us/powershell/azure/install-azurerm-ps?view=azurermps-6.6.0)

__tip__ : sometimes you need to run __ipconfig /flushdns__ to flush your dns as azure container ip address may change for newly created dns.

## New-Simulator
```powershell
    # ResourceGroup      - Azure resource group (creates one if one does not exist).
    # ContainerName       - This is name of the new container. The simulator url will have this. 
    # MongoDbAccountName  - Optional - Mongodb account name. If not given provider will be in memory 
    #                       and if given mongodb  connection string will be retrieved and container will be #                       configured                         
    #                       using mongo provider.(Note: Mongo database should exists)

    .\New-Simulator.ps1 -ResourceGroup simulator -ContainerName testhost
```
Once created it will open the dashboard in browser.If resource group does not exist it will create one.

## Get-Simulator

```powershell
    # ResourceGroup      - Azure resource group (creates one if one does not exist).
    .\Get-Simulator.ps1 -ResourceGroup simulator
```

## Test-Simulator
```powershell
    # ResourceGroup      - Azure resource group (creates one if one does not exist).
    # ContainerName       - This is name of the new container. The simulator url will have this. 
    .\Test-Simulator.ps1 -ResourceGroup simulator -ContainerName testhost
```

## Get-SimulatorLogs
```powershell
    # Gets simulator log files.
    # Useful for troubleshooting container instances.
    # ResourceGroup       - Azure resource group.
    # ContainerName       - Container name.
    .\Get-SimulatorLogs.ps1 -ResourceGroup simulator -ContainerName testhost
```

## Remove-SimulatorRemoving Simulator
```powershell
    # ResourceGroup      - Azure resource group (creates one if one does not exist).
    # ContainerName       - This is name of the new container. The simulator url will have this. 
    .\Remove-Simulator.ps1 -ResourceGroup simulator -ContainerName testhost
```

## New-MongoDb

```powershell
    # ResourceGroup       - Azure resource group (creates one if one does not exist).
    # Name                - This is name of the new mongodb account.
    
    .\New-MongoDb.ps1 -ResourceGroup simulator -Name simdb
```

## Integration tests

### Install Pester
```powershell
Install-Module -Name Pester -Force -SkipPublisherCheck
```
### Running tests
In service-simulator/azure directory
```powershell
    Invoke-Pester tests 
```
## Kubernetes
To create cluster in the begining

Install AzureRMAks module from [here](https://www.powershellgallery.com/packages/AzureRM.Aks/0.0.5-preview)

### Creating Cluster

```powershell
# Use the ssh-keygen utility (it is part of git install in c:\program files\git\usr\bin on windows)
# Creates new cluster
    $ResourceGroup = 'simtest'
    $ClusterName = 'simcluster'
    New-AzureRmAks -ResourceGroupName $ResourceGroup -Name $ClusterName -NodeCount 1 -SshKeyPath sshkeypathfile(ex: c:\test\test.key.pub)
```

```shell
    az aks create --name simcluster --resource-group simtest --node-count 1 --generate-ssh-keys
```
### Importing cluster credentials
With this step you can use local __kubectl__ tool to work with above created cluster.

```powershell
    $ResourceGroup = 'simtest'
    $ClusterName = 'simcluster'
    Import-AzureRmAksCredential -ResourceGroupName $ResourceGroup -Name $ClusterName
```

```shell
    az aks get-credentials --name simcluster --resource-group simtest
```
### Deploying 

####Installing kubectl
At this point you are ready with deploying.

```powershell
    curl https://storage.googleapis.com/kubernetes-release/release/v1.11.2/bin/windows/amd64/kubectl.exe -O:kubectl.exe
```

```shell
    kubectl apply -f service-simulator.yaml
```
* Watch the status
    * kubectl get service coaspsimulator --watch
* Get public ip address
    * kubectl get service  -o wide

#### Remove Kubectl


