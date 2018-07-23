const path = require('path');
const morgan = require('morgan');
const express = require('express');
const app = express();
var mongoose = require('mongoose');
var Schemas = require('./schemas')

const PORT = process.env.PORT || 5000;


// TODO [Justin] move mongo setup at a later time if needed
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

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});


// TODO [Justin] remove test endpoint when Mongo is fully configured
app.get('/api/test', (req, res) => {
  var returnModel = new Schemas.ReturnModel({ 'ticker': 'test', 'year': 1, 'value': .5 });

  returnModel.save(function (err) {
    if (err) return handleError(err);
    console.log('saved return model');
  });

  Schemas.ReturnModel.find({ 'ticker': 'test' }, function (err, results) {
    if (err) {
      console.error(err);
    }
    console.log(results);
    res.send(results);
  });

  Schemas.ReturnModel.populat()
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public', 'index.html'));
});

app.listen(PORT, () => console.info(`Listening on localhost:${PORT}`));
