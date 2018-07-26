//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var ReturnSchema = new Schema({
    'period': Number,
    'value': Number
})

var FundSchema = new Schema({
    'ticker': String,
    'name': String,
    'risk': String,
    'return': String,
    'expenseRatio': Number,
    'rating': Number,
    'returns': [ReturnSchema]
});

var Fund = mongoose.model('Fund', FundSchema);
var Return = mongoose.model('Return', ReturnSchema);

module.exports = { Fund, Return }
