require('dotenv').config({path: '../../.env'});
const assert = require('assert').strict;
const rp = require('request-promise');
const moment = require('moment');

// TODO [Anyone] Move to constants file and modify references?
const _YTD = 'Year To Date';
const _1_YEAR = '1 Year';
const _3_YEARS = '3 Years';
const _5_YEARS = '5 Years';
const _10_YEARS = '10 Years';

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
  const body = JSON.parse(response.body);
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
    performance1Year: run(data, _1_YEAR),
    performance3Years: run(data, _3_YEARS),
    performance5Years: run(data, _5_YEARS),
    performance10Years: run(data, _10_YEARS)
  };
}

function run(data, period) {
  const dates = configureDateRange(period);
  let to = dates.to;
  let from = dates.from;

  let newPrice = data['Time Series (Daily)'][to][`5. adjusted close`];
  let oldPrice = data['Time Series (Daily)'][from][`5. adjusted close`];
  let roi = null;

  roi = calculateReturn(period, newPrice, oldPrice);

  return roi;
}

function configureDateRange(period) {
  let to = moment().subtract(1, 'day');
  let from = moment();
  setPeriod(from, period);

  toWeekday(to);
  toWeekday(from);

  return {
    to: to.format('YYYY-MM-DD'),
    from: from.format('YYYY-MM-DD')
  }
}

function calculateReturn(period, newPrice, oldPrice) {
  let roi = null;
  switch (period) {
    case _YTD:
      roi = calculateAllReturns(newPrice, oldPrice);
      break;
    case _1_YEAR:
      roi = calculateAllReturns(newPrice, oldPrice, 1);
      break;
    case _3_YEARS:
      roi = calculateAllReturns(newPrice, oldPrice, 3);
      break;
    case _5_YEARS:
      roi = calculateAllReturns(newPrice, oldPrice, 5);
      break;
    case _10_YEARS:
      roi = calculateAllReturns(newPrice, oldPrice, 10);
      break;
  }
  return roi;
}

function calculateAllReturns(...args) {
  const newPrice = args[0];
  const oldPrice = args[1];
  if(args.length === 2) {
    return (newPrice - oldPrice) / oldPrice;
  }
  else if(args.length === 3) {
    const period = args[2];
    let cumulativeReturn = 1 + (newPrice - oldPrice) / oldPrice;
    let holdingPeriod = 365 / (period * 365);
    let annualizedReturn = cumulativeReturn ** holdingPeriod - 1;
    return annualizedReturn;
  }
}

function setPeriod(from, period) {
  switch (period) {
    case _YTD:
      from.subtract(1, 'year');
      from.month(11);
      from.date(31);
      break;
    case _1_YEAR:
      from.subtract(1, 'year');
      break;
    case _3_YEARS:
      from.subtract(3, 'years');
      break;
    case _5_YEARS:
      from.subtract(5, 'years');
      break;
    case _10_YEARS:
      from.subtract(10, 'years');
      break;
  }
  return from;
}

function toWeekday(date) {
  let day = date.day();
  if(day === 6) {
    date.subtract(1, 'day');
  }
  else if(day === 0) {
    date.subtract(2, 'days');
  }
  return date;
}
