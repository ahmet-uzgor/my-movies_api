const express = require('express');
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require('bcryptjs'); // Password hashing
const jwt = require('jsonwebtoken');

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

// users/authenticate POST user with its name & password and JWT creates and compare of user info's
router.post('/authenticate', (req,res)=>{
  const {username , password} = req.body;

  User.findOne({
    username
  },(err, user)=>{
    if(err){
      throw err;
    }

    if(!user){
      res.json({
        status: 404,
        message: "User is not found"
      });
    }
    else{
      bcrypt.compare(password,user.password).then((result)=>{
        if(result==false){
          res.json({
            status: 404,
            message: "Password is wrong"
          });
        }else{
          const payload = {
            username: username,
          };
          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn: 720
          }
          );
          res.json({
            status: true,
            token
          });
        }
      })
    };
  }
  );
});

module.exports = router;
