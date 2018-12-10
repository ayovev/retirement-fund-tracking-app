`use strict`;

require(`dotenv`).config({ path: `./.env` });

const path = require(`path`);
const moment = require(`moment`);
const morgan = require(`morgan`);
const express = require(`express`);
const app = express();

const DATABASE_URI = require(`./database`);

require(`mongodb`).MongoClient.connect(DATABASE_URI, { useNewUrlParser: true, poolSize: 10 }, (error, client) => {
  app.locals.MongoClient = client;
});

const testUpdate = require(`./getData`).testUpdate;

const PORT = process.env.PORT || 3001;

/* Express Middleware */

// Parse JSON payloads
app.use(express.json());

// Log requested resource and HTTP status code
app.use(morgan(`dev`));

// Serve any static files
app.use(express.static(path.join(__dirname, `app-client/build`)));

/* Route Handlers */

// Get all funds associated with an account
app.route(`/api/funds`)
  .get(async (request, response) => {
    const database = client.db();

    const collection = database.collection(`funds`);

    const result = await collection.find().toArray();

    response.send(result);
  });

// Authenticate user login request
app.route(`/api/login`)
  .post(async (request, response) => {
    const database = client.db();

    const collection = database.collection(`accounts`);

    const result = await collection.find({ email: { $eq: request.body.email } }).toArray();
    const user = result[0];

    if (!user) {
      response.sendStatus(404);
    }
    else if (user.password !== request.body.password) {
      response.sendStatus(401);
    }
    else {
      response.sendStatus(200);
    }
  });

// refactor this and make it more clear
app.route(`/api/testUpdate`)
  .get(async (request, response) => {
    try {
      const database = client.db();

      const collection = database.collection(`funds`);

      let result = await collection.find({ fundType: `Multi-Asset` }).toArray();
      result = result[0];

      const funds = result.funds;

      for (const fund of funds) {
        fund.returns = await testUpdate(fund.ticker);
      }

      result.funds = funds;

      await collection.replaceOne({ fundType: `Multi-Asset` }, result);

      response.sendStatus(200);
    }
    catch (error) {
      console.error(`ERROR: Something went wrong while trying to update funds`);
      console.error(error);
    }
  });

// refactor status endpoint
app.route(`/api/status`)
  .get(async (request, response) => {
    // include database status in this status check response

    response.send({
      datetime: moment().utcOffset(-7).format(`YYYY-MM-DD HH:mm:ss`),
      service: `app-server`,
      status: 200
    });
  });

app.listen(PORT, () => console.info(`Listening on localhost:${PORT}`));
