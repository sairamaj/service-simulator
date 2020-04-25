import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('PUT services', () => {

  it('responds with service1-request1', () => {
    return chai.request(app).put('/service1').send(' this is request_1 data')
      .then(res => {
        expect(res.status).to.equal(200);
        expect('<xml>service1_response_1_put_specific_data</xml>').equal(res['text'])
      });
  });

});

