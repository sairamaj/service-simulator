import * as mocha from 'mocha';
import * as chai from 'chai';
import * as dateformat from 'dateformat'
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST services with date formatting', () => {
    it('responds with todays date in response', () => {
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

    it('responds with 2 days after todays date in response', () => {
        return chai.request(app).post('/service3').send(' this is request_2 data')
            .then(res => {
                expect(res.status).to.equal(200);
                console.log(res.body)
                var date = new Date()
                var newDate = date.setDate(date.getDate() +2);
                let formattedDate =  dateformat(newDate, 'yyyy-MM-dd')
                console.log(res["text"])
                let response = JSON.parse(res["text"])
                expect(response.dateofbirth).to.be.equal(formattedDate)
            });
    });

    it('responds with mm-dd-yyyy format  date in response', () => {
        return chai.request(app).post('/service3').send(' this is request_3 data')
            .then(res => {
                expect(res.status).to.equal(200);
                console.log(res.body)
                var newDate = new Date()
                let formattedDate =  dateformat(newDate, 'dd-mm-yyyy')
                console.log(res["text"])
                let response = JSON.parse(res["text"])
                expect(response.dateofbirth).to.be.equal(formattedDate)
            });
    });

    it('responds with yyyyymmdd format date with padded some extra data in response', () => {
        return chai.request(app).post('/service3').send(' this is request_7 data')
            .then(res => {
                expect(res.status).to.equal(200);
                console.log(res.body)
                var newDate = new Date()
                let formattedDate =  dateformat(newDate, 'yyyymmdd') + '120000.000'
                console.log(res["text"])
                let response = JSON.parse(res["text"])
                expect(response.date).to.be.equal(formattedDate)
            });
    });

});

describe('POST services with random formatting', () => {
    it('responds with random number in response', () => {
        return chai.request(app).post('/service3').send(' this is request_4 data')
            .then(res => {
                expect(res.status).to.equal(200);
                console.log(res["text"])
                let response = JSON.parse(res["text"])
                expect(response.number).to.be.greaterThan(1000)
            });
    });

    it('responds with random number in response', () => {
        return chai.request(app).post('/service3').send(' this is request_5 data')
            .then(res => {
                expect(res.status).to.equal(200);
                console.log(res["text"])
                let response = JSON.parse(res["text"])
                expect(response.number).to.be.lessThan(100)
            });
    });    
});

describe('POST services with request variable formatting', () => {
    it('responds with value in request', () => {
        return chai.request(app).post('/service3').send(' this is <input>test value</input> request_6 data')
            .then(res => {
                expect(res.status).to.equal(200);
                console.log(res["text"])
                let response = JSON.parse(res["text"])
                expect(response.val).to.equal("test value")
            });
    });

});