const path = require('path');
const morgan = require('morgan');
const express = require('express');
const app = express();
var mongoose = require('mongoose');
var Schemas = require('./schemas')

const PORT = process.env.PORT || 5000;

var mongoDB = 'mongodb://127.0.0.1/retirement_db';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
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

app.get('/api/shares', (req, res) => {
  Schemas.ShareModel.find(function (err, results) {
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
