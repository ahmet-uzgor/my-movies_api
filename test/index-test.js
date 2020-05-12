// necessary libraries for testing chai - chai-Http - Mocha
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app'); // added our server on app.js file

chai.use(chaiHttp);

describe('Node Server test for my-movie-api', ()=>{
    it('(GET /) it returns homepage', (done)=>{
        chai.request(server)
        .get('/')
        .end((err,res)=>{
            res.should.have.status(200);
            done();
        })
    })
});
