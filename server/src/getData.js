require('dotenv').config({path: '../../.env'});
const assert = require('assert').strict;
const rp = require('request-promise');

const _YTD = 'Year To Date';
const _1_MONTH = '1 Month';
const _1_YEAR = '1 Year';
const _3_YEARS = '3 Years';
const _5_YEARS = '5 Years';
const _10_YEARS = '10 Years';

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
  assert.equal(response.statusCode, 200)
  const data = JSON.parse(response.body);
  console.log(calculateReturn(data, _YTD));
  console.log(calculateReturn(data, _1_MONTH));
  console.log(calculateReturn(data, _1_YEAR));
  console.log(calculateReturn(data, _3_YEARS));
  console.log(calculateReturn(data, _5_YEARS));
  console.log(calculateReturn(data, _10_YEARS));
});

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
  let string = null;
  string = `${date.getFullYear()}`;
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

function calculateReturn(data, period) {
  const dates = configureDateRange(period);
  const to = dates.to;
  const from = dates.from;

  // TODO [Alex] Format date better, put in function
  let t = formatDate(to);
  let f = formatDate(from);

  console.log(t);
  console.log(f);

  let newPrice = data['Time Series (Daily)'][t][`5. adjusted close`];
  let oldPrice = data['Time Series (Daily)'][f][`5. adjusted close`];
  let roi = null;

  switch (period) {
    case _YTD:
      roi = calculateNonAnnualizedReturn(newPrice, oldPrice);
      break;
    case _1_MONTH:
      roi = calculateNonAnnualizedReturn(newPrice, oldPrice);
      break;
    case _1_YEAR:
      roi = calculateNonAnnualizedReturn(newPrice, oldPrice);
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
    default:
      break;
  }
  return roi;
}

function calculateNonAnnualizedReturn(n,o) {
  return (n-o)/o;
}

function calculateAnnualizedReturn(n,o,period) {
  let cumulativeReturn = 1+(n-o)/o;
  let holdingPeriod = 365/(period*365);
  let annualizedReturn = (cumulativeReturn**holdingPeriod-1);
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
    default:
      break;
  }
  return from;
}
