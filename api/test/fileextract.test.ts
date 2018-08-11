import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('serice with file extract', () => {
    it.only('should return email for id 100.', () => {
        return chai.request(app)
            .post('/service9withfileextract')
            .send('<request_1><id>100</id></request_1>')
            .then(res => {
                expect(res.status).to.equal(200)
                var data = res['text']
                console.log(data)
                expect(data).contain('<id>100</id>')
                expect(data).contain('<email>100@abc.com</email>')
            })
    })

    it.only('should return email for id 200.', () => {
        return chai.request(app)
            .post('/service9withfileextract')
            .send('<request_1><id>200</id></request_1>')
            .then(res => {
                expect(res.status).to.equal(200)
                var data = res['text']
                console.log(data)
                expect(data).contain('<id>200</id>')
                expect(data).contain('<email>200@abc.com</email>')
            })
    })

})