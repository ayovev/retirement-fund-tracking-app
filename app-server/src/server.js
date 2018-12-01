`use strict`;

require(`dotenv`).config({ path: `./.env` });
const path = require(`path`);
const morgan = require(`morgan`);
const mongoose = require(`mongoose`);
const Schemas = require(`./schemas`);
const DB_URL = require(`./database`);
const express = require(`express`);
const app = express();

// TESTING USING MONOGDB NATIVE DRIVER
const MongoClient = require(`mongodb`).MongoClient;

const testUpdate = require(`./getData`).testUpdate;

// fix for working better with Docker
const PORT = process.env.PORT || 3001;

mongoose.connect(DB_URL, { useNewUrlParser: true });

// TESTING USING MONOGDB NATIVE DRIVER
MongoClient.connect(DB_URL, { useNewUrlParser: true });

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
          response.sendStatus(404);
        }
        else if (results.password !== request.body.password) {
          response.sendStatus(401);
        }
        else {
          response.send(results);
        }
      });
  });

// TESTING USING MONOGDB NATIVE DRIVER
app.route(`/api/testUpdate`)
  .get((request, response) => {
    MongoClient.connect(DB_URL, { useNewUrlParser: true }, (error, client) => {
      const database = client.db();
      const collection = database.collection(`funds`);
      collection.find({ fundType: `Multi-Asset` }).toArray()
        .then((documents) => {
          documents.forEach((document) => {
            funds = document.funds;
            funds.forEach((fund) => {
              const updateValues = testUpdate(fund.ticker);
            // fund.returns = testUpdate(fund.ticker);
            });
          });
        });
      response.sendStatus(200);
    });
  });

app.listen(PORT, () => console.info(`Listening on localhost:${PORT}`));
