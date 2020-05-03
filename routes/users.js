const express = require('express');
const router = express.Router();
const User = require("../models/Users");

/* GET users listing. */
router.get('/', (req, res)=> {
  const promise = User.find({});
  promise.then((users)=>{
    res.json(users);
  }).catch((err)=>{
    res.json({status: 404});
  });
});

router.post('/register', (req,res)=>{
  const newUser = new User(req.body);
  const promise = newUser.save();
  promise.then((user)=>{
    res.json({status: 1 , createdUser: user.username});
  }).catch((err=>{
    res.json({status: 404});
  }));
});

module.exports = router;
