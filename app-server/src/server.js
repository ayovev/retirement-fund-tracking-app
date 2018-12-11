`use strict`;

require(`dotenv`).config({ path: `./.env` });

const path = require(`path`);
const moment = require(`moment`);
const morgan = require(`morgan`);
const express = require(`express`);
const app = express();
const auth = require(`./auth`);

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

// TODO [Justin] add origins to be allowed post deployment
app.use((request, response, next) => {
  response.header(`Access-Control-Allow-Origin`, `http://localhost:3000`);
  response.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept, X-RE-TOKEN`);
  response.header(`Access-Control-Allow-Credentials`, `true`);
  next();
});

// Validate auth token when retrieving funds
app.use(`/api/funds`, function(request, response, next) {
  auth.ensureAuthentication(request, response, next);
});

/* Route Handlers */

app.route(`/api/login`)
  .post(async (request, response) => {
    const client = request.app.locals.MongoClient;

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
      const token = auth.createToken();

      response.cookie(`X-RE-TOKEN`, token.toString());
      response.send(result);
    }
  });

app.route(`/api/funds`)
  .get(async (request, response) => {
    const client = request.app.locals.MongoClient;

    const database = client.db();

    const collection = database.collection(`funds`);

    const result = await collection.find().toArray();

    response.send(result);
  });


// refactor this and make it more clear
app.route(`/api/testUpdate`)
  .get(async (request, response) => {
    try {
      const client = request.app.locals.MongoClient;

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
