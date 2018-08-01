// TODO [Anyone] Break up schemas/models into separate files

//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const ReturnSchema = new Schema({
    period: Number,
    value: Number
});

const FundSchema = new Schema({
    ticker: String,
    name: String,
    risk: String,
    return: String,
    expenseRatio: Number,
    rating: Number,
    returns: [ReturnSchema]
});

const FundTypeSchema = new Schema({
  fundType: String,
  funds: [FundSchema]
});

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
});

const AccountSchema = new Schema({
  username: String,
  password: String,
  user: UserSchema,
  funds: [FundTypeSchema]
});

const Return = mongoose.model('Return', ReturnSchema);
const Fund = mongoose.model('Fund', FundSchema);
const FundType = mongoose.model('FundType', FundTypeSchema);
const User = mongoose.model('User', UserSchema);
const Account = mongoose.model('Account', AccountSchema);

module.exports = { Return, Fund, FundType, User, Account }
