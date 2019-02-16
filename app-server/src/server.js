`use strict`;

const path = require(`path`);
const morgan = require(`morgan`);
// const winston = require(`winston`);
const jwt = require(`jsonwebtoken`);
const cookieParser = require(`cookie-parser`);
const express = require(`express`);
const { MongoClient, ObjectID } = require(`mongodb`);
const app = express();

const DATABASE_URI = require(`./database`);

const primaryDataAggregator = require(`../src/dataAggregators`).primary;
const secondaryDataAggregator = require(`../src/dataAggregators`).secondary;
const fallbackDataAggregator = require(`../src/dataAggregators`).fallback;

MongoClient.connect(DATABASE_URI, { useNewUrlParser: true, poolSize: 10 }, (error, client) => {
  app.locals.MongoClient = client;
  app.locals.Database = app.locals.MongoClient.db(`rta`);
  app.locals.UsersCollection = app.locals.Database.collection(`users`);
  app.locals.FundsCollection = app.locals.Database.collection(`funds`);
});

const HOST = `0.0.0.0`;
const PORT = process.env.NODE_ENV === `production` ? 8080 : 3001;

app.use(express.json());
app.use(morgan(`dev`));
app.use(express.static(path.join(__dirname, `../..`, `app-server/build`)));
app.use(cookieParser());

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
      const token = await jwt.sign({ data: user._id }, process.env.TOKEN_SECRET, { expiresIn: `30m` });

      response.cookie(`rtaToken`, token.toString(), { httpOnly: true });
      response.sendStatus(200);
    }
  });

app.route(`/api/funds`)
  .get(async (request, response, next) => {
    try {
      let token = request.cookies[`rtaToken`];
      token = await jwt.verify(token, process.env.TOKEN_SECRET);

      const userID = token.data;

      const { FundsCollection } = request.app.locals;

      const funds = await FundsCollection.find({ userAssociations: userID }).toArray();

      response.send(funds);
    }
    catch (error) {
      next(error);
    }
  });

// refactor this and make it more clear
app.route(`/api/update`)
  .get(async (request, response) => {
    try {
      const waitTime = 15;

      response.status(202).send(`Updating all funds`);

      const { FundsCollection } = request.app.locals;

      const funds = await FundsCollection.find().toArray();

      for (const fund of funds) {
        try {
          console.info(`Updating ${fund.ticker}`);

          fund.returns = await primaryDataAggregator.update(fund.ticker);
          fund.lastUpdated = new Date();

          FundsCollection.replaceOne({ _id: ObjectID(fund._id) }, fund);

          console.info(`Sleeping for ${waitTime} seconds`);
          await sleep(waitTime);
        }
        catch (error) {
          console.error(`Could not update fund ${fund.ticker}`);
          continue;
        }
      }
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

app.use((error, request, response, next) => {
  response.status(400).send(error);
});

function sleep(seconds) {
  const milliseconds = seconds * 1000;
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}


app.listen(PORT, HOST, () => console.info(`Listening on http://${HOST}:${PORT}`));
