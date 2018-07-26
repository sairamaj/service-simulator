import * as mocha from 'mocha';
import * as chai from 'chai';
import * as dateformat from 'dateformat'
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST services with todays date in response', () => {

    it('responds with service3-request1 with formatted today date', () => {
        return chai.request(app).post('/service3').send(' this is request_1 data')
            .then(res => {
                expect(res.status).to.equal(200);
                console.log(res.body)
                let date = new Date();
                let formattedDate =  dateformat(new Date(), 'yyyy-MM-dd')
                console.log(res["text"])
                let response = JSON.parse(res["text"])
                expect(response.dateofbirth).to.be.equal(formattedDate)
            });
    });
});