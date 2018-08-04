echo off
echo ----------------------------------------------
echo        Update Container registry id from manual1
echo        Create Service principal with role as read and scope to container registry
echo        Update manually KeyValutCreaton.json with Service principal appId, password and tenantId
echo        Deploy KeyValultCreation which creates key valut and store appid and password
echo ----------------------------------------------

set resourceGroup=ServiceSimulator
set location=eastus
set servicePrincipalName=ServiceSimlatorSp
set containerRegistryId=/subscriptions/821d6eee-fe66-4c21-8e8b-ab80122b0d35/resourceGroups/ServiceSimulator/providers/Microsoft.ContainerRegistry/registries/ServiceSimulatorRegistry

              
echo -----------------------------------------
echo Create service credentials with read permission to the above created registry
echo -----------------------------------------
pause
echo %containerRegistryId%
call az ad sp create-for-rbac --name %servicePrincipalName%  --role reader --scopes %containerRegistryId%
if %ERRORLEVEL% NEQ 0 GOTO EXIT

echo -----------------------------------------
echo Take appId, password and tenantid here
echo Update the appid and password and tenantid in KeyValutCreation.json
echo -----------------------------------------
pause 

echo -----------------------------------------
echo Will start deployment to create key valut and set secrets.
echo -----------------------------------------
pause
call az group deployment create --name ServiceSimulatorDeployment  --template-file KeyValutCreation.json --resource-group %resourceGroup%
if %ERRORLEVEL% NEQ 0 GOTO EXIT
GOTO SUCCESS

:EXIT
echo Fix the error
GOTO END
:SUCCESS
echo Success
:END