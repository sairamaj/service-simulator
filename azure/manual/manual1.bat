echo off
echo ----------------------------------------------
echo        Create Resource group
echo        Create Container registry
echo        Print Container registry id
echo        Proceed to manual2
echo ----------------------------------------------
set resourceGroup=ServiceSimulator
set location=eastus
set servicePrincipalName=ServiceSimlatorSp
set containerRegistryName=ServiceSimulatorRegistry


echo -----------------------------------------
echo temporary - will be converted in to powershell
echo -----------------------------------------
echo 
echo "Lets Login to Azure"
pause 
rem az login

REM create group
echo -----------------------------------------
echo creating the resource group
echo -----------------------------------------
pause
call az group create --name %resourceGroup% --location %location%

echo -----------------------------------------
echo Creating the container registry
echo -----------------------------------------
pause
call az group deployment create --name ServiceSimulatorDeployment --template-file CreateContainerRegistry.json --resource-group %resourceGroup% 
az acr show --name %containerRegistryName% --resource-group %resourceGroup% --query id
echo "Take this container registry id and update in manual2 and run manual2"
