import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Post to JSON service', () => {
    it('should return JSON content type.', () => {
        return chai.request(app)
            .post('/service7_json_content_type')
            .send('{\"input\":\"request_1\"}').set('content-type', 'application/json')
            .then(res => {
                expect(res.status).to.equal(200)
                expect(res.type).to.equal('application/json')
            })
    })
})