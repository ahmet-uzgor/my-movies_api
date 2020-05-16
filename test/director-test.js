const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app'); // added our server on app.js file

chai.use(chaiHttp);
let token; //JWT token to authenticate api pages entering
let director_id;

describe('tests /api/directors', ()=>{
    before((done)=>{
        chai.request(server)
            .post('/users/authenticate' )
            .send({username: 'ahmet-uzgor1',password:'12345'}) // To take token from jwt I created test user
            .end((err,res)=>{
                token = res.body.token;
                done();
            });
    });

    describe('/GET all directors', ()=>{
        it('/api/directors get and list all directors',(done)=>{
            chai.request(server)
            .get('/api/directors')
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                done();
            });
        });
    });
});