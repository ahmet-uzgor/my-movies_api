var express = require('express');
var router = express.Router();
var Movie = require("../models/Movie");

router.post("/",(req,res,next)=>{
    const {title,category,country,year,imdbScore,dateOfMovie} = req.body ;

    const movie = new Movie({
        title:title,
        category:category,
        country:country,
        year:year,
        imdbScore:imdbScore,
        dateOfMovie:dateOfMovie
    });

    movie.save((err,data)=>{
        if(err){
            res.json(err);
        }
        else{
            //res.send("Succesfully saving completed");
            res.json(data);
        };
    });

})

module.exports = router;
