import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET services', () => {

  it('responds with service1 GET', () => {
    return chai.request(app).get('/service1')
      .then(res => {
        expect(res.status).to.equal(200);
        expect('<xml>service1_response_1_for_get</xml>').equal(res['text'])
      });
  });

});

