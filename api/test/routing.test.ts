import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('route with extra path ', () => {

    it('responds with base path', () => {
        return chai.request(app).post('/service1/test.aspx').send(' this is request_1 data')
            .then(res => {
                expect(res.status).to.equal(200);
                expect('<xml>service1_response_1</xml>').equal(res['text'])
            });
    });
})