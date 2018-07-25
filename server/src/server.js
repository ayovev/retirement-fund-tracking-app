'use strict'

const path = require('path');
const assert = require('assert').strict;
const morgan = require('morgan');
const mongoose = require('mongoose');
const Schemas = require('./schemas');
const DB_URL = require('./database');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

mongoose.connect(DB_URL, {useNewUrlParser: true})
.then(client => console.log(client.connections[0].readyState));
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(morgan('dev', {
  skip: (request, response) => {
    return response.statusCode < 400;
  },
  stream: process.stderr
}));

app.use(morgan('dev', {
  skip: (request, response) => {
    return response.statusCode >= 400;
  },
  stream: process.stdout
}));

// Serve any static files
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/funds', (request, response) => {
  Schemas.Fund.find(function (error, results) {
    try {
      assert.equal(error, null)
    } catch (error) {
      console.error("ERROR CAUGHT");
      console.error(error);
    }
    response.send(results);
  });
});

// Handle React routing, return all requests to React app
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'client/public', 'index.html'));
});

app.listen(PORT, () => console.info(`Listening on localhost:${PORT}`));
