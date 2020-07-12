```cmd
cd deploy
docker login
docker build -f .\Dockerfile -t service-simulator:latest .
Invoke-WebRequest http://192.168.99.100:3000/service1
docker run -it -p:3000:80 service-simulator:latest
map the folder: (folderpath)c:\temp\fileprovider to (foldername)c/fileprovider  ( Note: see no : in the folder name)

docker run -it -v //c/temp://data/fileprovider -p:3000:80 service-simulator:latest
docker run -it -v //c/fileprovider://data/fileprovider -p:3000:80 service-simulator:latest /bin/sh
```

VM Oracle Virtual Box for settings.

[Docker on Windows — Mounting Host Directories](https://rominirani.com/docker-on-windows-mounting-host-directories-d96f3f056a2c)

[Fixing Volumes in Docker Toolbox](https://medium.com/@Charles_Stover/fixing-volumes-in-docker-toolbox-4ad5ace0e572)
```cmd
    docker-machine stop
    docker-machine start
```
### Windows 10 home box
Docker tool box needs to be installed (legacy docker solution)
Legacy desktop solution. Docker Toolbox is for older Mac and Windows systems that do not meet the requirements of Docker Desktop for Mac and Docker Desktop for Windows. We recommend updating to the newer applications, if possible.
