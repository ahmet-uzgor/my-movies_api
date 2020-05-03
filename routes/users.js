const express = require('express');
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require('bcryptjs'); // Password hashing

// users/ GET all user information 
router.get('/', (req, res)=> {
  const promise = User.find({});
  promise.then((users)=>{
    res.json(users);
  }).catch((err)=>{
    res.json({status: 404});
  });
});

// users/register POST. it creates a new user with specifed username & password
router.post('/register', (req,res)=>{
  const {username , password} = req.body;
  bcrypt.hash(password,10).then((hash)=>{
    const userCreate = new User({
      username: username,
      password: hash
    });
    
    const promise = userCreate.save();
    promise.then((user)=>{
      res.json({status: 1 , createdUser: user.username});
    }).catch((err)=>{
      res.json(err);
    });
  }).catch((err)=>{
    console.log("Hashing ERROR");
  });
});

module.exports = router;
