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

const PlanSchema = new Schema({
  planAdministrator: String,
  fundTypes: [FundTypeSchema]
});

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  birthDate: Date
});

const AccountSchema = new Schema({
  username: String,
  password: String,
  user: UserSchema,
  plans: [PlanSchema]
});

const Return = mongoose.model('Return', ReturnSchema);
const Fund = mongoose.model('Fund', FundSchema);
const FundType = mongoose.model('FundType', FundTypeSchema);
const Plan = mongoose.model('Plan', PlanSchema);
const User = mongoose.model('User', UserSchema);
const Account = mongoose.model('Account', AccountSchema);

module.exports = { Return, Fund, FundType, Plan, User, Account }
