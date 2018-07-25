const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Schemas = require('./schemas');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

let mongoDB = 'mongodb://127.0.0.1:27017/retirement_db';
mongoose.connect(mongoDB, {useNewUrlParser: true})
.then(client => console.log(client.connections[0].readyState));
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(morgan('dev', {
  skip: (req, res) => {
    return res.statusCode < 400;
  },
  stream: process.stderr
}));

app.use(morgan('dev', {
  skip: (req, res) => {
    return res.statusCode >= 400;
  },
  stream: process.stdout
}));

// Serve any static files
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/funds', (req, res) => {
  Schemas.FundModel.find(function (err, results) {
    if (err) {
      console.error(err);
    }
    res.send(results);
  });
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public', 'index.html'));
});

app.listen(PORT, () => console.info(`Listening on localhost:${PORT}`));
