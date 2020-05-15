// necessary libraries for testing chai - chai-Http - Mocha
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app'); // added our server on app.js file

chai.use(chaiHttp);
let token; //JWT token to authenticate api pages entering
let movie_id;


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
    });

    describe('/POST method tests /api/movies/',()=>{
        it('it should post a movie with given body',(done)=>{
            // post body
            const testMovie = {
                title: "Movie test",
                director_id: "5eaeb7cd01bc0316f864b166",
                category : "Action",
                country : "America",
                year : 2010,
                imdbScore : 9.5
            };
            
            chai.request(server)
                .post('/api/movies')
                .send(testMovie)
                .set('x-access-token', token)
                .end((err,res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdbScore');
                    movie_id = res.body._id;
                    done();
                });
        });
    });

    describe('/api/movies/:movie_id  get movie with id',()=>{
        it('',(done)=>{
            chai.request(server)
                .get('/api/movies/'+ movie_id)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    done();
                });
        });
    });

    describe('/PUT method tests /api/movies/',()=>{
        it('it should uptaded a movie with given id',(done)=>{
            // put body
            const testMovie = {
                title: "Uptaded test movie",
                category : "Uptaded category",
                country : "America",
                year : 2010,
                imdbScore : 5
            };
            
            chai.request(server)
                .put('/api/movies/'+ movie_id)
                .send(testMovie)
                .set('x-access-token', token)
                .end((err,res) =>{
                    res.should.have.status(200);
                    //res.body.should.be.a('object');
                    //res.body.should.have.property('title');
                    //res.body.should.have.property('category');
                    //res.body.should.have.property('country');
                    //res.body.should.have.property('year');
                    //res.body.should.have.property('imdbScore');
                    done();
                });
        });
    });

    describe('/DELETE method tests api/movies/:movie_id',()=>{
        it('deletes movie by given id on api/movies/:movie_id',(done)=>{
            chai.request(server)
            .delete('/api/movies/'+ movie_id)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.should.be.a('object');
                //res.should.have.property("deletedMovie")
                done();
            });

        });
    });
});
