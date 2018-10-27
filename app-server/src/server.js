`use strict`;

const path = require(`path`);
const morgan = require(`morgan`);
const mongoose = require(`mongoose`);
const Schemas = require(`./schemas`);
const DB_URL = require(`./database`);
const express = require(`express`);
const app = express();
const auth = require('./auth/auth');
const jwt = require('jwt-simple');

// Possibly implement 'express-validator' for form validation

// fix for working better with Docker
const PORT = process.env.PORT || 3001;

mongoose.connect(DB_URL, { useNewUrlParser: true });

/* Express Middleware */

// Parse JSON payloads
app.use(express.json());

// Log requested resource and HTTP status code
app.use(morgan(`dev`));

// Serve any static files
app.use(express.static(path.join(__dirname, `client/build`)));

// Validate auth token when retrieving funds
app.use('/api/funds', function (req, res, next) {
  auth.ensureAuthentication(req, res, next);
})

/* Route Handlers */

// Get all funds associated with an account
app.get(`/api/funds`, (request, response) => {
    Schemas.Fund.find()
      .then((results) => {
        response.send(results);
      })
      .catch((error) => {
        console.error(`ERROR CAUGHT`);
        console.error(error);
      });
  });

// Authenticate user login request
app.post(`/api/login`, (request, response) => {
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
      });
  });

  

app.listen(PORT, () => console.info(`Listening on localhost:${PORT}`));
