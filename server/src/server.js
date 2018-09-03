'use strict'

const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Schemas = require('./schemas');
const DB_URL = require('./database');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

update(DB_URL);

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
  Schemas.Fund.find()
  .then(results => {
    console.log(results);
    response.send(results);
  })
  .catch(error => {
    console.error(`ERROR CAUGHT`);
    console.error(error);
  });
});

// Handle React routing, return all requests to React app
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'client/public', 'index.html'));
});

app.listen(PORT, () => console.info(`Listening on localhost:${PORT}`));

async function update(DB_URL) {
  await mongoose.connect(DB_URL, {useNewUrlParser: true});
  console.log(mongoose.connection.readyState);
}
