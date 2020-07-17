# Service-Simulator
__Note__: Currently this has some issues with __Node 10.x.*__. Use __Node 8.17.*__ for now.

Service simulator app will allow you to write simulation data for any http service. It is simple matching some inputs with request and then respond accordingly. 

  ![summary](doc/images/summary.png)

  ### Overview
  ![summary](doc/images/overview.png)

## Features
* dynamic end points (each service listens at different urls).
* multiple matches in request to generate different responses
* dynamic templates for __dates__, __random numbers__, __extracting data from request__ to embed in response, __linking to   external data__.
* test the responses before publishing.
* Dynamic response generation through custom java script for advanced scenarios
* Log timings for requests for given time threshold
* Custom URL rewrites 
* Capture request arrived and responses served for service.
* Performance and troubleshooting logging
* dashboard ui to view/edit

## Technology
* NodeJS
* TypeScript
* Angular 2.0
* MongoDB
* Azure container
* Handlebars module for template

# How to build it
* Clone the repository
* At command prompt
    * Run __buildAll__ ( *first time takes time as it installs node modules*)
    * Run __deploy__
        * which will ask you to remove deploy directory
    * The deploy directory is your entire package 

# How to run it
* Running Locally
    * in deploy directory 
        * run setup.bat (*one time*)
        * node dist\index.js
    * Open browser and http://localhost:3000 to open dashboard
* Running as Windows Service
    * In deploy directory
        * node installAsService.js
    * use service control manager start __service-simulator__ service 
* Running in Azure Container
    * [here](./azure/README.MD)

## Running with different providers
Default is in memory (uses data\inmemory\testdata.json)

* Running File provider
    * Run __runwithfileprovider.bat__
* Running with Mongo db provider
    * Change mongodb provider connection in runwithmongoprovider.bat (if mongo is not local)
    * Run __runwithmongoprovider.bat__

## Using https
By default localhost.crt localhost.key are available and you can use them. Import localhost.crt in to your Trusted Root store so that you won't get warning when using in browser and also in powershell.

## Test it
* Running unit test
    * cd api
    * npm test

## Dashboard
Default dashboard is available at http://localhost:3000 and https://localhost:3443. Dashboard is explained [here](./dashboard/readme.md)

[full documentation](./doc/README.MD)