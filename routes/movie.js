var express = require('express');
var router = express.Router();
var Movie = require("../models/Movie");

// api/movies  GET all movies method
router.get('/',(req,res)=>{
    const promise = Movie.find({});
    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json({status: err});
    })
});

// api/movies/top10 GET top10 movies regarding imdb score
router.get('/top10', (req,res)=>{
    const promise = Movie.find({}).limit(10).sort({'imdbScore':-1});
    promise.then((movies)=>{
        res.json(movies);
    }).catch((err)=>{
        res.json({status:404 , error : err});
    });
});

// api/movies/:movie_id update a movie with specific id via PUT method
router.put('/:movie_id',(req,res)=>{
    const promise = Movie.findByIdAndUpdate(req.params.movie_id,req.body);
    promise.then((movie)=>{
        res.json({status: 1 , updatedMovie: movie.title});
    }).catch((err)=>{
        res.json({status : 404});
    });
});

// api/movies/between/:start_year/:end_year GET movies between two specified years
router.get('/between/:start_year/:end_year', (req,res)=>{
    const {start_year , end_year} = req.params;
    const promise = Movie.find({
        year: {"$gte":start_year ,"$lte":end_year}
    });
    promise.then((movies)=>{
        res.json(movies);
    }).catch((err)=>{
        res.json({status:404});
    });

});

// api/movies/:movie_id GET a movie which will come regarding movie_id
router.get('/:movie_id',(req,res)=>{
    const promise = Movie.findById(req.params.movie_id);
    promise.then((movie)=>{
        res.send(movie.title);
    }).catch((err)=>{
        res.json({status: err });
    });
});

// api/movies POST movie data to mongodb with Movie model body
// Also there is a easy way like : const movie = new Movie(req.body); it is equal to below codes.
router.post("/",(req,res,next)=>{
    const {title,category,country,year,imdbScore} = req.body ;

    const movie = new Movie({
        title:title,
        category:category,
        country:country,
        year:year,
        imdbScore:imdbScore
    });

    movie.save((err,data)=>{
        if(err){
            res.json(err);
        }
        else{
            //res.send("Succesfully saving completed");
            res.json({status: 1});
        };
    });

});

// api/movies/:movie_id DELETE a movie with a specific id
router.delete('/:movie_id',(req,res)=>{
    const promise = Movie.findByIdAndDelete(req.params.movie_id);
    promise.then((movie)=>{
        res.json({status: 2 , deletedMovie: movie.title});
    }).catch((err)=>{
        res.json({status: 404});
    });
});

module.exports = router;
