`use strict`;

const path = require(`path`);
const morgan = require(`morgan`);
const mongoose = require(`mongoose`);
const Schemas = require(`./schemas`);
const DB_URL = require(`./database`);
const express = require(`express`);
const app = express();

// Possibly implement 'express-validator' for form validation

// fix for working better with Docker
const PORT = process.env.PORT || 5000;

mongoose.connect(DB_URL, {useNewUrlParser: true});

/* Express Middleware */

// Parse JSON payloads
app.use(express.json());

// Log requested resource and HTTP status code
app.use(morgan(`dev`));

// Serve any static files
app.use(express.static(path.join(__dirname, `client/build`)));

/* Route Handlers */

// Get all funds associated with an account
app.route(`/api/funds`)
  .get((request, response) => {
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
app.route(`/api/login`)
  .post((request, response) => {
    Schemas.Account.findOne({ email: { $eq: request.body.email } })
      .then((results) => {
        if (!results) {
          response.sendStatus(204);
        }
        else if (results.password !== request.body.password) {
          response.sendStatus(401);
        }
        else {
          response.send(results);
        }
      });
  });

app.listen(PORT, () => console.info(`Listening on localhost:${PORT}`));
