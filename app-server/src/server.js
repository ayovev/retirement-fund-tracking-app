'use strict';

const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Schemas = require('./schemas');
const DB_URL = require('./database');
const express = require('express');
const app = express();
const auth = require('./auth/auth');


// Possibly implement 'express-validator' for form validation

// fix for working better with Docker
const PORT = process.env.PORT || 3002;

mongoose.connect(DB_URL, { useNewUrlParser: true });

/* Express Middleware */

// Parse JSON payloads
app.use(express.json());

// Log requested resource and HTTP status code
app.use(morgan('dev'));

// Serve any static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Validate auth token when retrieving funds
app.use('/api/funds', function (req, res, next) {
  auth.ensureAuthentication(req, res, next);
})

//Enable CORS from all origins until deployment
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* Route Handlers */

app.get('/', (req, res) => {
  res.send('Retirement API\n');
});

// Get all funds associated with an account
app.get('/api/funds', (request, response) => {
    Schemas.Fund.find()
      .then((results) => {
        response.send(results);
      })
      .catch((error) => {
        console.error('ERROR CAUGHT');
        console.error(error);
      });
  });

// Authenticate user login request
app.post('/api/login', (request, response) => {
    Schemas.Account.findOne({ email: { $eq: request.body.email } })
      .then((results) => {
        if (!results) {
          response.sendStatus(204);
        }
        else if (results.password !== request.body.password) {
          response.sendStatus(401);
        }
        else {
          auth.createToken()
          response.set('Token', results.email);
          response.send(results);
        }
      })
      .catch((err) => {
        response.status(500).json({
        status: `Error occurred during login process: ${err}`
        });
    });
  });

  

app.listen(PORT, () => console.info(`Listening on localhost:${PORT}`));
