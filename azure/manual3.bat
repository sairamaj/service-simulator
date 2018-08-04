echo off
echo ----------------------------------------------
echo        Verify registry
echo        Check the reader roles assigned to this registry
echo        Get appid and password from keyvalut
echo        Verify service principal login
echo ----------------------------------------------
set resourceGroup=ServiceSimulator
set location=eastus
set servicePrincipalName=ServiceSimlatorSp
set appUrl=http://ServiceSimlatorSp
set containerRegistryName=ServiceSimulatorRegistry
set keyValutName=servicesimulator-vault
set appKeyValutName=servicesimulator-pull-usr
set appKeyValutPassword=servicesimulator-pull-pwd
set containerRegistryId=/subscriptions/821d6eee-fe66-4c21-8e8b-ab80122b0d35/resourceGroups/ServiceSimulator/providers/Microsoft.ContainerRegistry/registries/ServiceSimulatorRegistry

echo ---------------------------------------
echo    Verify registry
echo ---------------------------------------
pause
call az acr show --resource-group %resourceGroup% --name %containerRegistryName%

echo ---------------------------------------
echo    Check the roles assigned to this registry
echo ---------------------------------------
call az role assignment list --scope %containerRegistryId%

echo ---------------------------------------
echo    Get appid and password from keyvault
echo ---------------------------------------
pause
echo appid
call az keyvault secret show --vault-name %keyValutName% --name %appKeyValutName% --query value -o tsv
echo pwd
call az keyvault secret show --vault-name %keyValutName% --name %appKeyValutPassword% --query value -o tsv

echo ---------------------------------------
echo   Login with service principal
echo ---------------------------------------
echo "az login --service-principal -u %appUrl% -p <pwd --tenant 4925b807-9380-4135-93cc-9c23aa7c411b
echo --------------------------------------
echo    Login with original az login again to set to the subscription account
echo --------------------------------------

