// necessary libraries for testing chai - chai-Http - Mocha
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app'); // added our server on app.js file

chai.use(chaiHttp);
let token; //JWT token to authenticate api pages entering

describe('tests /api/movies', ()=>{
    before((done)=>{
        chai.request(server)
            .post('/users/authenticate' )
            .send({username: 'ahmet-uzgor1',password:'12345'}) // To take token from jwt I created test user
            .end((err,res)=>{
                token = res.body.token;
                done();
            });
    });

    describe('/GET all movies', ()=>{
        it('it should list all movies',(done)=>{
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    })
});
