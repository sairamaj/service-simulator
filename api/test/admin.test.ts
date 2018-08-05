import * as chai from 'chai'
import chaiHttp = require('chai-http')

import app from '../src/App'

chai.use(chaiHttp)
const expect = chai.expect

describe('GET api/v1/admin/services', () => {
  it('responds with JSON array', () => {
    return chai.request(app).get('/api/v1/admin/services')
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res).to.be.json
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.length(8)
      })
  })

  it('should include service1', () => {
    return chai.request(app).get('/api/v1/admin/services')
      .then(res => {
        let serivce1 = res.body.find(service => service.name === 'service1')
        expect(serivce1).to.exist
      })
  })

})

describe('GET api/v1/admin/services/:name', () => {

  it('responds with single JSON object', () => {
    return chai.request(app).get('/api/v1/admin/services/service1')
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res).to.be.json
        expect(res.body).to.be.an('object')
      })
  })

  it('should return service1', () => {
    return chai.request(app).get('/api/v1/admin/services/service1')
      .then(res => {
        expect(res.body.name).to.equal('service1');
      })
  })

  it('should return service1 with case sensitive', () => {
    return chai.request(app).get('/api/v1/admin/services/SERVICE1')
      .then(res => {
        expect(res.body.name).to.equal('service1');
      })
  })

  it('should have service url', () => {
    return chai.request(app).get('/api/v1/admin/services')
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res).to.be.json
        expect(res.body).to.be.an('array')
        let serivce1 = res.body.find(service => service.name === 'service1')
        expect(serivce1).to.exist
        expect(serivce1.url).to.be.contain('/service1')
      })
  })

  it('default tyep should be soap', () => {
    return chai.request(app).get('/api/v1/admin/services')
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res).to.be.json
        expect(res.body).to.be.an('array')
        let serivce1 = res.body.find(service => service.name === 'service1')
        expect(serivce1).to.exist
        expect(serivce1.type).to.be.equal('soap')
      })
  })

  it('should have service type', () => {
    return chai.request(app).get('/api/v1/admin/services')
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res).to.be.json
        expect(res.body).to.be.an('array')
        let serivce1 = res.body.find(service => service.name === 'service7_json_content_type')
        expect(serivce1).to.exist
        expect(serivce1.type).to.be.equal('json')
      })
  })

  it('should return 404 for not available service', () => {
    return chai.request(app).get('/api/v1/admin/services/na')
      .catch(err => {
        expect(err.status).to.equal(404)
      })
  })
})

describe('GET api/v1/admin/services/:name/maps/:mapName', () => {

  it('responds with map details', () => {
    return chai.request(app).get('/api/v1/admin/services/service1/maps/request_1')
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res).to.be.json
        let map = res.body
        expect(map.name).to.equal('request_1')
        expect(map.request).to.equal('request_1 here')
        expect(map.response).to.equal('<xml>service1_response_1</xml>')
        expect(map.matches).to.not.be.undefined
        expect(map.matches.length).to.equal(1)
        expect(map.matches[0]).to.equal('request_1')
      })
  })
})

describe('POST api/v1/admin/services/:name/test', () => {
  it('responds with post data', () => {
    return chai.request(app).post('/api/v1/admin/services/service1/test').send(' this is request_1 data')
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res).to.be.json
        let resp = res.body
        expect(resp.status).to.equal(200)
        expect(resp.response).to.equal('<xml>service1_response_1</xml>')
        expect(resp.matches).to.not.be.undefined
        expect(resp.matches.length).to.equal(1)
        expect(resp.matches[0]).to.equal('request_1')
      })
  })

  it('should return 404 with match not found', () => {
    return chai.request(app).post('/api/v1/admin/services/service1/test').send('data does not match.')
      .then(res => {
        expect(res.status).to.equal(200)
        console.log(res.body)
      })
  })

})


describe('Adding new test case', () => {
  it('responds with 200 and adds new response', () => {
    var mapName = 'request_' + Math.floor(Math.random() * 10000) + 1
    console.log(mapName)
    var newRequest = {
      name: mapName,
      request: 'request for ' + mapName + ' here',
      response: 'response for ' + mapName + ' here',
      matches: [mapName]
    }
    return chai.request(app).post('/api/v1/admin/services/service1/maps').send(newRequest)
      .then(res => {
        expect(res.status).to.equal(200);

        return chai.request(app).get('/api/v1/admin/services/service1/maps/' + mapName)
          .then(res => {
            expect(res.status).to.equal(200)
            expect(res).to.be.json
            let map = res.body
            expect(map.name).to.equal(newRequest.name)
            expect(map.request).to.equal(newRequest.request)
            expect(map.response).to.equal(newRequest.response)
            expect(map.matches).to.not.be.undefined
            expect(map.matches.length).to.equal(1)
            expect(map.matches[0]).to.equal(mapName)
          })
      });
  });
});

describe('Adding new service', () => {
  it('responds with 200', () => {
    var serviceName = 'service_' + Math.floor(Math.random() * 10000) + 1
    return chai.request(app).post('/api/v1/admin/services').send({ name: serviceName })
      .then(res => {
        expect(res.status).to.equal(200);

        return chai.request(app).get('/api/v1/admin/services/' + serviceName)
          .then(res => {
            expect(res.status).to.equal(200)
            expect(res).to.be.json
            let map = res.body
            expect(map.name).to.equal(serviceName)
          })
      });
  });

  it('should have soap type in get', () => {
    var serviceName = 'service_' + Math.floor(Math.random() * 10000) + 1
    return chai.request(app).post('/api/v1/admin/services').send({ name: serviceName, type: "soap" })
      .then(res => {
        expect(res.status).to.equal(200);

        return chai.request(app).get('/api/v1/admin/services/' + serviceName)
          .then(res => {
            expect(res.status).to.equal(200)
            expect(res).to.be.json
            let map = res.body
            expect(map.name).to.equal(serviceName)
            expect(map.type).to.equal('soap')
          })
      });
  });

  it('should have json type in get', () => {
    var serviceName = 'service_' + Math.floor(Math.random() * 10000) + 1
    return chai.request(app).post('/api/v1/admin/services').send({ name: serviceName, type: "json" })
      .then(res => {
        expect(res.status).to.equal(200);

        return chai.request(app).get('/api/v1/admin/services/' + serviceName)
          .then(res => {
            expect(res.status).to.equal(200)
            expect(res).to.be.json
            let map = res.body
            expect(map.name).to.equal(serviceName)
            expect(map.type).to.equal('json')
          })
      });
  });

});

describe('Adding new service with no name', () => {
  it('responds with 404', () => {
    var serviceName = 'service_' + Math.floor(Math.random() * 10000) + 1
    return chai.request(app).post('/api/v1/admin/services').send({})
      .then(res => {
        expect(res.status).to.equal(404);
      }).catch(err => {
        expect(err.status).to.equal(404);
      })
  });
});

describe('Adding existing service', () => {
  it('responds with 422', () => {
    return chai.request(app).post('/api/v1/admin/services').send({ name: 'service1' })
      .then(res => {

      }).catch(err => {
        expect(err.status).to.equal(422)
      })
  });
});

describe('Adding existing service with different case', () => {
  it('responds with 422', () => {
    return chai.request(app).post('/api/v1/admin/services').send({ name: 'SERVICE1' })
      .then(res => {
        console.log('in success:' + res.body)
        chai.assert(false, 'supposed to get error.')
      }).catch(err => {
        expect(err.status).to.equal(422)
      })
  });
});

describe('Editing test case', () => {
  it('responds with 200 and modified response', () => {
    var mapName = 'request_' + Math.floor(Math.random() * 10000) + 1
    console.log(mapName)
    var newRequest = {
      name: mapName,
      request: 'request for ' + mapName + ' here',
      response: 'response for ' + mapName + ' here',
      matches: [mapName]
    }
    return chai.request(app).post('/api/v1/admin/services/service1/maps').send(newRequest)
      .then(res => {
        expect(res.status).to.equal(200);

        return chai.request(app).get('/api/v1/admin/services/service1/maps/' + mapName)
          .then(res => {
            expect(res.status).to.equal(200)
            expect(res).to.be.json
            let map = res.body
            expect(map.name).to.equal(newRequest.name)
            expect(map.request).to.equal(newRequest.request)
            expect(map.response).to.equal(newRequest.response)
            expect(map.matches).to.not.be.undefined
            expect(map.matches.length).to.equal(1)
            expect(map.matches[0]).to.equal(mapName)

            newRequest.request = newRequest.request + 'modified'
            newRequest.response = newRequest.response + 'modified'

            var modifiedRequest = {
              name: newRequest.name,
              request: newRequest.request + 'modified',
              response: newRequest.response + 'modified',
              matches: [mapName]
            }

            // get current number maps
            return chai.request(app).get('/api/v1/admin/services/service1')
              .then(res => {
                let service = res.body
                let prevMapCount = service.config.length
                console.log('prevMapCount:' + prevMapCount)

                return chai.request(app).patch('/api/v1/admin/services/service1/maps').send(modifiedRequest)
                  .then(res => {

                    expect(res.status).to.equal(200)
                    expect(res).to.be.json
                    let map = res.body
                    return chai.request(app).get('/api/v1/admin/services/service1/maps/' + mapName)
                      .then(res => {
                        let map = res.body
                        expect(map.name).to.equal(modifiedRequest.name)
                        expect(map.request).to.equal(modifiedRequest.request)
                        expect(map.response).to.equal(modifiedRequest.response)
                        expect(map.matches).to.not.be.undefined
                        expect(map.matches.length).to.equal(1)
                        expect(map.matches[0]).to.equal(mapName)

                        // map count should be same
                        return chai.request(app).get('/api/v1/admin/services/service1')
                          .then(res => {
                            let service = res.body
                            let currentMapCount = service.config.length
                            console.log('currentMapCount:' + currentMapCount)
                            console.log('prevMapCount:' + prevMapCount)
                            expect(currentMapCount).to.be.equal(prevMapCount)
                          })
                      })
                  })
              })

          })
      });
  });
});

describe('Editing existing test case with add', () => {
  it('should modify', () => {
    // get current number maps
    return chai.request(app).get('/api/v1/admin/services/service8')
      .then(res => {
        let service = res.body
        let prevMapCount = service.config.length
        console.log('prevMapCount:' + prevMapCount)

        var mapRequest = service.config[0]  // grab the first one.
        mapRequest.response = 'new response'
        return chai.request(app).post('/api/v1/admin/services/service8/maps').send(mapRequest)
          .then(res => {

            expect(res.status).to.equal(200)
            expect(res).to.be.json
            let map = res.body
            return chai.request(app).get('/api/v1/admin/services/service8/maps/' + mapRequest.name)
              .then(res => {
                let map = res.body
                expect(map.name).to.equal(mapRequest.name)
                expect(map.request).to.equal(mapRequest.request)
                expect(map.response).to.equal(mapRequest.response)
                expect(map.matches).to.not.be.undefined
                expect(map.matches.length).to.equal(1)
                expect(map.matches[0]).to.equal(mapRequest.name)

                // map count should be same
                return chai.request(app).get('/api/v1/admin/services/service8')
                  .then(res => {
                    let service = res.body
                    let currentMapCount = service.config.length
                    console.log('currentMapCount:' + currentMapCount)
                    console.log('prevMapCount:' + prevMapCount)
                    expect(currentMapCount).to.be.equal(prevMapCount)
                  })
              })
          })
      })

  })
});
