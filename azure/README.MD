# Creating Service Simulator in Azure container environment

## New-Simulator

Create new simulator by running the powershell command
```powershell
    # ResourceGroup      - Azure resource group (creates one if one does not exist).
    # ContainerName       - This is name of the new container. The simulator url will have this. 
    # MongoDbAccountName  - Optional - Mongodb account name. If not given provider will be in memory and if                             given mongodb  connection string will be retrieved and container will be configured                         using mongo provider.(Note: Mongo database should exists)

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


