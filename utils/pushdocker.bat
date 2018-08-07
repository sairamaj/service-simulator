set DOCKER_ID_USER=sairamaj
rem <user>/repository:tag
docker login
docker tag servicesimulator %DOCKER_ID_USER%/servicesimulator
docker push %DOCKER_ID_USER%/servicesimulator

