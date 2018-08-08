# Creating Service Simulator in Azure container environment

## New-Simulator
Create new simulator by running the powershell command

```powershell
    # ResourceGroup      - Azure resource group (creates one if one does not exist).
    # ContainerName       - This is name of the new container. The simulator url will have this. 
    .\New-Simulator.ps1 -ResourceGroup simulator -ContainerName testhost
```
Once created it will open the dashboard in browser.If resource group does not exist it will create one.

## Get existing simulator containers

```powershell
    # ResourceGroup      - Azure resource group (creates one if one does not exist).
    .\Get-Simulator.ps1 -ResourceGroup simulator
```

## Test existing container.
```powershell
    # ResourceGroup      - Azure resource group (creates one if one does not exist).
    # ContainerName       - This is name of the new container. The simulator url will have this. 
    .\Test-Simulator.ps1 -ResourceGroup simulator -ContainerName testhost
```

## Removing Simulator

```powershell
    # ResourceGroup      - Azure resource group (creates one if one does not exist).
    # ContainerName       - This is name of the new container. The simulator url will have this. 
    .\Remove-Simulator.ps1 -ResourceGroup simulator -ContainerName testhost
```

## Creating a mongodb for simulator to use

```powershell
    .\New-MongoDb.ps1 -ResourceGroup simulator -Name simdb
```


