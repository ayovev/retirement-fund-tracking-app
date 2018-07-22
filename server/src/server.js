const path = require('path');
const morgan = require('morgan');
const express = require('express');
const app = express();
var Schemas = require('./schemas/schemas')
const PORT = process.env.PORT || 5000;


//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/retirement_db';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
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

app.get('/api/test', (req, res) => {
  var returnModel = new Schemas.ReturnModel({'ticker': 'test', 'year': 1, 'value': .5});

  returnModel.save(function (err) {
    if (err) return handleError(err);
    console.log('saved return model');
  });

  Schemas.ReturnModel.find({'ticker': 'test'}, function(err, results){
    if (err){
      console.error(err);
    } 
    console.log(results);
    res.send(results);
  });
  
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
