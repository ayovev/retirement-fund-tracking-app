require('dotenv').config({path: '../../.env'});
const assert = require('assert').strict;
const rp = require('request-promise');

// TODO [Alex] Use moment.js instead of custom Date manipulations
// const moment = require('moment');

// TODO [Anyone] Move to constants file and modify references?
const _YTD = 'Year To Date';
const _1_MONTH = '1 Month';
const _1_YEAR = '1 Year';
const _3_YEARS = '3 Years';
const _5_YEARS = '5 Years';
const _10_YEARS = '10 Years';

// Remove prototype, make regular function
Date.prototype.fix = function() {
  let day = this.getDay();
  if(day === 6) {
    this.setDate((this.getDate() - 1));
  }
  else if(day === 0) {
    this.setDate((this.getDate() - 2));
  }
  return this;
}

let options = {
  url: `https://www.alphavantage.co/query?`,
  qs: {
    function: `TIME_SERIES_DAILY_ADJUSTED`,
    symbol: `AMCPX`,
    outputsize: `full`,
    apikey: process.env.ALPHAVANTAGE_API_KEY,
  },
  resolveWithFullResponse: true,
};

rp(options).then(response => {
  const body = JSON.parse(response.body)
  const bodyHasError = checkBodyForError(body);
  try {
    assert.equal(bodyHasError, false);
  }
  // TODO [Alex] Come up with better / more descriptive error messaging
  catch (error) {
    console.error(`ERROR retrieving data for ${options.qs.symbol}`);
    return;
  }

  const data = body;

  console.log(runAll(data));
})
// TODO [Alex] Come up with better / more descriptive error messaging
.catch(error => {
  console.log(`Promise error ${error}`);
});

function checkBodyForError(body) {
  if(Object.keys(body).includes(`Error Message`)) {
    return true;
  }
  return false;
}

function runAll(data) {
  return {
    performanceYTD: run(data, _YTD),
    performance1Month: run(data, _1_MONTH),
    performance1Year: run(data, _1_YEAR),
    performance3Years: run(data, _3_YEARS),
    performance5Years: run(data, _5_YEARS),
    performance10Years: run(data, _10_YEARS)
  }
}

function run(data, period) {
  const dates = configureDateRange(period);
  let to = dates.to;
  let from = dates.from;

  to = formatDate(to);
  from = formatDate(from);

  let newPrice = data['Time Series (Daily)'][to][`5. adjusted close`];
  let oldPrice = data['Time Series (Daily)'][from][`5. adjusted close`];
  let roi = null;

  roi = calculateReturn(period, newPrice, oldPrice);

  return roi;
}

function configureDateRange(period) {
  let to = new Date();
  to.setDate(to.getDate() - 1);

  let from = new Date(to);
  setPeriod(from, period);

  to.fix();
  from.fix();

  return {
    to: to,
    from: from
  }
}

function formatDate(date) {
  let string = ``;

  string += `${date.getFullYear()}`;
  string += `-`;
  if(date.getMonth() < 10) {
    string += `0${date.getMonth() + 1}`;
  }
  else {
    string += `${date.getMonth() + 1}`;
  }
  string += `-`;
  if(date.getDate() < 10) {
    string += `0${date.getDate()}`;
  }
  else {
    string += `${date.getDate()}`;
  }
  return string;
}

function calculateReturn(period, newPrice, oldPrice) {
  let roi = null;
  switch (period) {
    case _YTD:
      roi = calculateNonAnnualizedReturn(newPrice, oldPrice);
      break;
    case _1_MONTH:
      roi = calculateNonAnnualizedReturn(newPrice, oldPrice);
      break;
    case _1_YEAR:
      roi = calculateAnnualizedReturn(newPrice, oldPrice, 1);
      break;
    case _3_YEARS:
      roi = calculateAnnualizedReturn(newPrice, oldPrice, 3);
      break;
    case _5_YEARS:
      roi = calculateAnnualizedReturn(newPrice, oldPrice, 5);
      break;
    case _10_YEARS:
      roi = calculateAnnualizedReturn(newPrice, oldPrice, 10);
      break;
  }
  return roi;
}

function calculateNonAnnualizedReturn(newPrice,oldPrice) {
  return (newPrice-oldPrice)/oldPrice;
}

function calculateAnnualizedReturn(newPrice,oldPrice,period) {
  let cumulativeReturn = 1 + (newPrice - oldPrice) / oldPrice;
  let holdingPeriod = 365 / (period * 365);
  let annualizedReturn = cumulativeReturn ** holdingPeriod - 1;
  return annualizedReturn;
}

function setPeriod(from, period) {
  switch (period) {
    case _YTD:
      from.setFullYear(from.getFullYear() - 1);
      from.setMonth(11);
      from.setDate(31);
      break;
    case _1_MONTH:
      from.setMonth(from.getMonth()-1);
      break;
    case _1_YEAR:
      from.setFullYear(from.getFullYear() - 1);
      break;
    case _3_YEARS:
      from.setFullYear(from.getFullYear() - 3);
      break;
    case _5_YEARS:
      from.setFullYear(from.getFullYear() - 5);
      break;
    case _10_YEARS:
      from.setFullYear(from.getFullYear() - 10);
      break;
  }
  return from;
}
