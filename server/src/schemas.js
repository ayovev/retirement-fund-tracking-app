//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var ReturnSchema = new Schema({
    'ticker': String,
    'year': Number,
    'value': Number
})

var ShareSchema = new Schema({
    'ticker': String,
    'multi-asset': String,
    'risk': String,
    'return': String,
    'expense-ratio': Number,
    'ytd': Number,
    'rating': Number,
    'returns': [ReturnSchema]
});

var ShareModel = mongoose.model('ShareModel', ShareSchema);
var ReturnModel = mongoose.model('ReturnModel', ReturnSchema);

module.exports = { ShareModel, ReturnModel }