const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Director = require("../models/Director");

// api/directors POST a director with specified request body
router.post('/', (req,res,next)=>{
    const director = new Director(req.body);
    const promise = director.save();
    promise.then((director)=>{
        res.json({status: 1 , name: director.name});
    }).catch((err)=>{
        res.json({status: 404});
    });
});

// api/directors GET . it lists all directors
router.get('/',(req,res)=>{
    const promise = Director.aggregate([
    {
        $lookup: {
            from: 'movies',
            localField: '_id',
            foreignField: 'director_id',
            as: 'movies'
        }
    },
    {
        $unwind:{
            path: '$movies',
            preserveNullAndEmptyArrays: true
        }
    }
]);


    promise.then((director)=>{
        res.json(director);
    }).catch((err)=>{
        res.json({status: 404});
    });
});

// api/director/:director_id GET director with a specified id,
router.get('/:director_id',(req,res)=>{
    const promise = Director.aggregate([
    {
        $match: {
            '_id': mongoose.Types.ObjectId(req.params.director_id) 
        }
    },   
    {
        $lookup: {
            from: 'movies',
            localField: '_id',
            foreignField: 'director_id',
            as: 'movies'
        }
    },
    {
        $unwind:{
            path: '$movies',
            preserveNullAndEmptyArrays: true
        }
    }
]);


    promise.then((director)=>{
        res.json(director);
    }).catch((err)=>{
        res.json({status: 404});
    });
});

// api/directors PUT . it uptades a director information with specified id.
router.put('/:director_id',(req,res)=>{
    const promise = Director.findByIdAndUpdate(req.params.director_id);
    promise.then((director)=>{
        res.json({status: 1, uptadedDirector: director.name});
    }).catch((err)=>{
        res.json({status: 404});
    });
});

module.exports = router;