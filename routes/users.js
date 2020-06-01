const express = require('express');
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require('bcryptjs'); // Password hashing
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

//urlencodedParser
const urlencodedParser = express().use(bodyParser.urlencoded({extended: false}))
// users/ GET all user information 
router.get('/', (req, res)=> {
  res.render('users',{message: "Please register firstly"});
});

// users/register POST. it creates a new user with specifed username & password
router.post('/register', (req,res)=>{
  console.log(req.body);
  const {username , password} = req.body;
  bcrypt.hash(password,10).then((hash)=>{
    const userCreate = new User({
      username: username,
      password: hash
    });
    
    const promise = userCreate.save();
    promise.then((user)=>{
      //res.json({status: 1 , createdUser: user.username});
      res.redirect("http://localhost:3000")
    }).catch((err)=>{
      res.json(err);
    });
  }).catch((err)=>{
    console.log("Hashing ERROR");
  });
});

// users/authenticate POST user with its name & password and JWT creates and compare of user info's
router.post('/authenticate', urlencodedParser ,(req,res)=>{
  console.log(req.body.password);
  const username = req.body.username;
  const password = req.body.password;
  const api_secret_key =  "Basic secret key"

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
          const token = jwt.sign(payload, api_secret_key, {
            expiresIn: 720
          }
          );/*
          res.json({
            status: true,
            token
          });*/
          res.redirect('http://localhost:3000/api/movies?x-access-token='+token);
        }
      })
    };
  }
  );
});

module.exports = router;
