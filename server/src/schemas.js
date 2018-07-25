//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var ReturnSchema = new Schema({
    'year': Number,
    'value': Number
})

var FundSchema = new Schema({
    'ticker': String,
    'multi-asset': String,
    'risk': String,
    'return': String,
    'expense-ratio': Number,
    'ytd': Number,
    'rating': Number,
    'returns': [ReturnSchema]
});

var FundModel = mongoose.model('ShareModel', FundSchema);
var ReturnModel = mongoose.model('ReturnModel', ReturnSchema);

module.exports = { FundModel, ReturnModel }
