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
        expect(res.body).to.have.length(6)
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
})

