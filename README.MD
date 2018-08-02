# Service-Simulator
Service simulator app will allow you to write simulation data for any http service. It is simple matching some inputs with request and then respond accordingly. 

  ![summary](doc/images/summary.png)

  ### Overview
  ![summary](doc/images/overview.png)

## Features
* dynamic end points (each serivce listens at diffeernt urls).
* multiple matches in request to generate different responses
* dynamic templating for dates, random numbers, extracting data from request to embed in response.
* test configured responses.
* Capture request arrived and responses served for service.
* Performance and troubleshooting logging

# Terminology
### Service  
Listens at particular Url and accepts request and sends response.
### Matches
Match strings matched against to request to find out which response needs to be sent.
### Request
POST string coming from the client.
### Response
Data sent back to client for POST request.
### Templating
Response data can have some dynamic templating for dates, random numbers and extracting some data from input.
### Provider
Data provider which serves the response
#### In memory provider
* Used for testing purpose
#### File provider
* Configuration and Responses are stored on file system.
#### Mongo Db Provider
* Configuration and Responses are stored in Mongo DB.
#### Served Requests
* Requests will be logged along with responses sent to trouble shooting

## Configuration
### In Memory

testdata.json is used for in memory and is used for unit test. The entire configuration is part of single json file. Simple configuration is like below

```json
[
    {
        "name": "service1name",
        "config" :[
            {
            "name" : "testcase1 name here",
            "matches" :[
                "match1","match2"
            ],
            "request": "sample request here",
            "response" : "sample response here"
            },
            {
            "name" : "testcase2 name here",
            "matches" :[
                "match1","match2"
            ],
            "request": "sample request here",
            "response" : "sample response here"
            }            
        ]
    },
    {
        "name": "service2name",
        "config" :[
            {
            "name" : "testcase name here",
            "matches" :[
                "match1","match2"
                ],
            "request": "sample request here",
            "response" : "sample response here"
            }
        ]
    },

]

Sample JSON file can be viewed here: ![testdata.json](api\data\inmemory\testdata.json))
```
```json
 {
        "name": "service1",
        "config": [
            {
                "name": "request_1",
                "matches": [
                    "request_1"
                ],
                "request": "request_1 here",
                "response": "<xml>service1_response_1</xml>"
            },
            {
                "name": "request_2",
                "matches": [
                    "request_2"
                ],
                "request": "request_2 here",
                "response": "<xml>service1_response_2</xml>"
            }
        ]
    },
```
In above we have a __service1__ which will be exposed and has 2 test cases. 

### File Provider

Below shows the file system.
![fileprovider](doc/images/fileprovider.png)
Each directory under fileprovider will is a service. It will have below 4 directories 

### config
    Contains single json file which has mapping of requests and responses.
```json
    [
        {
            "name": "request_1",
            "matches": [
                "request_1"
            ]
        },
        {
            "name": "request_2",
            "matches": [
                "request_2"
            ]
        }
    ]
```
### logs
Request along with served responses will be logged here
### requests
Sample request files (used during testing in dashboard). The name of the file will be name specified in the configuration file with .xml as extension.
### responses
Response files will be here. The name of the file is name specified in the match with .xml extension.

### Mongo Db Provider
One can configure to use Mongo db with connection string so that all requests and responses along with configuration will be stored in Mongo db.

## How to build

## How to Run

## Build Docker image.




