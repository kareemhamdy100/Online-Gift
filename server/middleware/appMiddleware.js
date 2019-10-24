const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
var cors = require('cors')
// setup global middleware here

exports.globalMiddleware = (app)=> {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static('.'));
  app.use(passport.initialize());
  app.use(cors());
};

// eslint-disable-next-line no-unused-vars
exports.errMiddleware = (err,req , res , next)=>{
      const status = err.status || 400;
      res.status(status).json({errMSG: err.message});
}