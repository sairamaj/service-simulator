
echo ----------------------------------------------
echo        Build image in Azure container registry
echo ----------------------------------------------

set resourceGroup=ServiceSimulator
set containerRegistryName=ServiceSimulatorRegistry
set imageName=ServiceSimulator
set version=v01
echo on
call az acr build --registry %containerRegistryName% --image %imageName%:%version% --resource-group %resourceGroup% --timeout 3600 --verbose .
echo off