`use strict`;

require(`dotenv`).config({ path: `../.env` });

const path = require(`path`);
const moment = require(`moment`);
const morgan = require(`morgan`);
const jwt = require(`jsonwebtoken`);
const cookieParser = require(`cookie-parser`);
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

// Parse request cookies
app.use(cookieParser());

/* Route Handlers */

app.route(`/api/login`)
  .post(async (request, response) => {
    const client = request.app.locals.MongoClient;

    const database = client.db();

    const collection = database.collection(`accounts`);

    const user = await collection.findOne({ email: { $eq: request.body.email } });

    if (!user) {
      response.sendStatus(404);
    }
    else if (user.password !== request.body.password) {
      response.sendStatus(401);
    }
    else {
      response.clearCookie(`rtaToken`);
      const token = await jwt.sign({ data: user._id }, process.env.TOKEN_SECRET, { expiresIn: `1h` });

      response.cookie(`rtaToken`, token.toString(), { httpOnly: true });
      response.sendStatus(200);
    }
  });

app.route(`/api/funds`)
  .get(async (request, response) => {
    // const token = request.cookies[`rtaToken`];
    // const email = await jwt.verify(token, process.env.TOKEN_SECRET);

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

      const result = await collection.findOne({ fundType: `Multi-Asset` });

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
