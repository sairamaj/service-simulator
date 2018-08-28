import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';
import { fail } from 'assert';

chai.use(chaiHttp);
const expect = chai.expect;

describe('logs', () => {

    it('should get logs', () => {
        return chai.request(app).get('/api/v1/admin/services/service1/processedrequests')
            .then(curLogs => {
                var prevLogCount = curLogs.body.length;
                return chai.request(app).post('/service1').send(' this is request_1 data')
                    .then(res => {
                        expect(res.status).to.equal(200);
                        expect('<xml>service1_response_1</xml>').equal(res['text'])
                        return chai.request(app).get('/api/v1/admin/services/service1/processedrequests')
                            .then(res => {
                                console.log('logs response:.' + res)
                                expect(res.status).to.equal(200);
                                expect(res).to.be.json;
                                expect(res.body).to.be.an('array');
                                console.log('previous count:' + prevLogCount)
                                expect(res.body).to.have.length(prevLogCount + 1);

                                let logs = res.body
                                logs.forEach(l => {
                                    expect(l.id).to.be.not.empty
                                })
                            })
                    });
            });
    });

    it('should get log', () => {
        return chai.request(app).post('/service1').send(' this is request_1 data')
            .then(res => {
                expect(res.status).to.equal(200);
                expect('<xml>service1_response_1</xml>').equal(res['text'])
                return chai.request(app).get('/api/v1/admin/services/service1/processedrequests')
                    .then(res => {
                        console.log('logs response:.' + res)
                        expect(res.status).to.equal(200);
                        expect(res).to.be.json;
                        expect(res.body).to.be.an('array');

                        let logs = res.body;
                        let log = logs[0]
                        console.log('requesting:' + log.id)
                        return chai.request(app).get('/api/v1/admin/services/service1/processedrequests/' + log.id)
                            .then(res => {
                                expect(res.status).to.equal(200);
                                expect(res).to.be.json;

                                let logReturned = res.body
                                console.log(logReturned)
                                expect(logReturned.id).to.be.equal(log.id)

                            });

                    })
            });
    });

    it('should clear logs', () => {
        return chai.request(app).post('/service1').send(' this is request_1 data')
            .then(res => {
                return chai.request(app).del('/api/v1/admin/services/service1/processedrequests')
                    .then(res => {
                        return chai.request(app).get('/api/v1/admin/services/service1/processedrequests')
                            .then(res => {
                                expect(res.status).to.equal(200);
                                expect(res).to.be.json;
                                expect(res.body).to.be.an('array');
                                expect(res.body).to.have.length(0);
                            })
                    })
            });
    });

    it('404 log should have status as 404', () => {
        return chai.request(app).del('/api/v1/admin/services/service1/processedrequests')
        .then(res=>{
            return chai.request(app).post('/service1').send('no matching.')
            .then(res=>{
                throw Error('should have failed with 404.')
            })
            .catch(err => {
                return chai.request(app).get('/api/v1/admin/services/service1/processedrequests')
                .then(res=>{
                    expect(res.body[0].status).to.be.equal(404)
                })
            })
        })
    });

    it('should get name of the testcase for 200', () => {
        return chai.request(app).del('/api/v1/admin/services/service1/processedrequests')
        .then(res=>{
            return chai.request(app).post('/service1').send('request_1')
            .then(res=>{
                return chai.request(app).get('/api/v1/admin/services/service1/processedrequests')
                .then(res=>{
                    console.log(res.body[0])
                    expect(res.body[0].name).to.be.equal('request_1')
                })
            })
        })
    });

    it('500 log should have status as 500', () => {
        return chai.request(app).del('/api/v1/admin/services/service6_with_invalid_template/processedrequests')
        .then(res=>{
            return chai.request(app).post('/service6_with_invalid_template').send('this is request_1 data.')
            .then(res=>{
                throw Error('should have failed with 500.')
            })
            .catch(err => {
                return chai.request(app).get('/api/v1/admin/services/service6_with_invalid_template/processedrequests')
                .then(res=>{
                    expect(res.body).to.be.an('array');                
                    expect(res.body).to.have.length(1); 
                    expect(res.body[0].status).to.be.equal(500)
                })
            })
        })
    });

});