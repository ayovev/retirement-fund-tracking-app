`use strict`;

const path = require(`path`);
const morgan = require(`morgan`);
const jwt = require(`jsonwebtoken`);
const cookieParser = require(`cookie-parser`);
const express = require(`express`);
const { MongoClient, ObjectID } = require(`mongodb`);
const app = express();

const DATABASE_URI = require(`./database`);
const testUpdate = require(`./getData`).testUpdate;

MongoClient.connect(DATABASE_URI, { useNewUrlParser: true, poolSize: 5 }, (error, client) => {
  app.locals.MongoClient = client;
  app.locals.Database = app.locals.MongoClient.db(`rta`);
  app.locals.UsersCollection = app.locals.Database.collection(`users`);
  app.locals.FundsCollection = app.locals.Database.collection(`funds`);
});

const HOST = `0.0.0.0`;
const PORT = process.env.NODE_ENV === `production` ? 8080 : 3001;

/* Express Middleware */

// Parse JSON payloads
app.use(express.json());

// Log requested resource and HTTP status code
app.use(morgan(`dev`));

// Serve any static files
app.use(express.static(path.join(__dirname, `../..`, `app-server/build`)));

// Parse request cookies
app.use(cookieParser());

/* Route Handlers */

app.route(`/api/login`)
  .post(async (request, response) => {
    const { UsersCollection } = request.app.locals;

    const user = await UsersCollection.findOne({ email: { $eq: request.body.email } });

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
    let token = request.cookies[`rtaToken`];
    token = await jwt.verify(token, process.env.TOKEN_SECRET);

    const userID = token.data;

    const { FundsCollection } = request.app.locals;

    const funds = await FundsCollection.find({ userAssociations: userID }).toArray();

    response.send(funds);
  });

// refactor this and make it more clear
app.route(`/api/testUpdate`)
  .get(async (request, response) => {
    try {
      const { FundsCollection } = request.app.locals;

      const result = await FundsCollection.findOne({ fundType: `Multi-Asset` });

      const funds = result.funds;

      for (const fund of funds) {
        fund.returns = await testUpdate(fund.ticker);
      }

      result.funds = funds;

      await FundsCollection.replaceOne({ fundType: `Multi-Asset` }, result);

      response.sendStatus(200);
    }
    catch (error) {
      console.error(`ERROR: Something went wrong while trying to update funds`);
      console.error(error);
    }
  });

app.route(`/api/status`)
  .get(async (request, response) => {
    databaseCheck = () => {
      const { MongoClient } = request.app.locals;
      return MongoClient.isConnected();
    };

    const databaseStatus = databaseCheck();

    if (databaseStatus) {
      response.sendStatus(200);
    }
    else {
      response.sendStatus(422);
    }
  });

app.route(`/api/admin/permissions`)
  .get(async (request, response) => {
    let token = request.cookies[`rtaToken`];
    token = await jwt.verify(token, process.env.TOKEN_SECRET);

    const userID = token.data;

    const { UsersCollection } = request.app.locals;

    const result = await UsersCollection.findOne({ _id: ObjectID(userID) });

    response.send(Object(result.role));
  });

app.route(`*`)
  .get((request, response) => {
    response.sendFile(path.join(__dirname, `../..`, `app-server/build/index.html`));
  });

app.listen(PORT, HOST, () => console.info(`Listening on http://${HOST}:${PORT}`));
