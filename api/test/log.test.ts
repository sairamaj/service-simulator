import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Invalid template in response', () => {
    it(' should have logs.', () => {
        return chai.request(app).post('/service6_with_invalid_template').send(' this is request_1 data')
            .catch(err => {
                expect(500).to.equal(err.status);
                return chai.request(app).get('/api/v1/admin/logs/')
                    .then(res => {
                        expect(res.status).to.equal(200);
                        expect(res).to.be.json;
                        expect(res.body).to.be.an('array');
                        let logs = res.body
                        expect(logs.length).to.be.greaterThan(0)
                        // find log
                        var errorLog = logs.find(l => l.type == 'error')
                        expect(errorLog).to.not.undefined
                        expect(errorLog.message).to.be.contain('Error: Parse error on line 1:\n...te format')
                    })
            });
    });
});

