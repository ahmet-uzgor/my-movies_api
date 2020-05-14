const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const movieRouter = require('./routes/movie');
const directorRouter = require('./routes/director');

// config with secret key
const app = express();
const config = require('./config');
app.set('api_secret_key',config.api_secret_key);

// Middleware Setup
const verifyToken = require('./middleware-jwt/verify-token');

//Mongodb Connection creation

const gcpUri = "mongodb+srv://<mongodblinkforGcp>"; //google cloud mongodb server
const awsUri = "mongodb+srv://<mongodblinkforGcp>"; // amazon cloud mongodb server
mongoose.connect(awsUri,{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
  console.log('Mongodb connection is completed');
})
.catch((err)=>{
  mongoose.connect(gcpUri,{useNewUrlParser: true,useUnifiedTopology: true})
  .then(()=>{
    console.log("Google cloud server connected due to AWS connection error");
  })
  .catch((err)=>{
    console.log("Both server connection is failed");
    console.log(err)
  });
});

// MongoDb settings finished.

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api',verifyToken);
app.use('/users', usersRouter);
app.use('/api/movies',movieRouter);
app.use('/api/directors',directorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;