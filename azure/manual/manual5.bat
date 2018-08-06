echo off
echo -----------------------------------------------------------
echo             Createing registry
echo -----------------------------------------------------------
rem az cosmosdb list --name coaspsimulator
rem az container create --name simtesting --image servicesimulatorregistry.azurecr.io/testing/simulator:latest --dns-name-label servicesimulator --registry-username <usernamehere> --registry-password <pwdhere> 
rem az container create -g ServiceSimulator --name simtesting --image servicesimulatorregistry.azurecr.io/testing/simulator:latest --dns-name-label servicesimulator  --registry-user <username> --registry-password <pwd> -e PROVIDER=mongo MONGODB_CONNECTION="mongodbconnectionstring"
rem append database name (simulator before ?ssl=true ,i.e xxxxx/simulator?ssl=true)

echo  after the above command you can browse at http://servicesimulator.eastus.azurecontainer.io/

