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

module.exports = router;