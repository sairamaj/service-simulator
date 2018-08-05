echo off
echo -----------------------------------------------------------
echo             Createing registry
echo -----------------------------------------------------------
rem az container create --name simtesting --image servicesimulatorregistry.azurecr.io/testing/simulator:latest --dns-name-label servicesimulator --registry-username <usernamehere> --registry-password <pwdhere>
echo  after the above command you can browse at http://servicesimulator.eastus.azurecontainer.io/