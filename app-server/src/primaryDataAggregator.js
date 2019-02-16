`use strict`;

const axios = require(`axios`);
const moment = require(`moment-business-days`);

const _YTD = `Year To Date`;
const _1_YEAR = `1 Year`;
const _3_YEARS = `3 Years`;
const _5_YEARS = `5 Years`;
const _10_YEARS = `10 Years`;

async function getAlphaVantageData(ticker) {
  const options = {
    method: `GET`,
    url: `https://www.alphavantage.co/query?`,
    params: {
      function: `TIME_SERIES_DAILY_ADJUSTED`,
      symbol: ticker.toUpperCase(),
      outputsize: `full`,
      apikey: process.env.ALPHAVANTAGE_API_KEY
    },
    resolveWithFullResponse: true
  };

  const response = await axios.request(options);
  const body = response.data;

  const bodyHasError = Object.keys(body).includes(`Error Message`);

  if (bodyHasError) {
    console.error(`ERROR retrieving data for ${options.qs.symbol}`);
    console.error(error);
    return;
  }

  const data = body[`Time Series (Daily)`];

  return [
    { "period": 0, "value": run(data, _YTD) },
    { "period": 1, "value": run(data, _1_YEAR) },
    { "period": 3, "value": run(data, _3_YEARS) },
    { "period": 5, "value": run(data, _5_YEARS) },
    { "period": 10, "value": run(data, _10_YEARS) }
  ];
}

function checkDateInArray(date, data) {
  return Object.keys(data).includes(date);
}

function run(data, period) {
  const dates = configureDateRange(period, data);
  const { from, to } = dates;

  const newPrice = data[to][`5. adjusted close`];
  const oldPrice = data[from][`5. adjusted close`];
  let roi = null;

  roi = calculateReturn(period, newPrice, oldPrice);

  return roi;
}

function configureDateRange(period, data) {
  const to = moment().prevBusinessDay().subtract(1, `day`);
  const from = moment();

  setPeriod(from, period);

  const toValid = checkDateInArray(to.format(`YYYY-MM-DD`), data);
  const fromValid = checkDateInArray(from.format(`YYYY-MM-DD`), data);

  if (!toValid || !fromValid) {
    if (!toValid) {
      to.prevBusinessDay();
    }
    if (!fromValid) {
      from.prevBusinessDay();
    }
  }

  return {
    to: to.format(`YYYY-MM-DD`),
    from: from.format(`YYYY-MM-DD`)
  };
}

function calculateReturn(period, newPrice, oldPrice) {
  let roi = null;

  /* eslint indent: ["error", 2, { "SwitchCase": 1 }]*/
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
  return roi.toFixed(4);
}

function calculateAllReturns(...args) {
  const newPrice = args[0];
  const oldPrice = args[1];
  if (args.length === 2) {
    return (newPrice - oldPrice) / oldPrice;
  }
  else if (args.length === 3) {
    const period = args[2];
    const cumulativeReturn = 1 + (newPrice - oldPrice) / oldPrice;
    const holdingPeriod = 365 / (period * 365);
    const annualizedReturn = cumulativeReturn ** holdingPeriod - 1;
    return annualizedReturn;
  }
}

function setPeriod(from, period) {
  switch (period) {
    case _YTD:
      from.dayOfYear(2);
      break;
    case _1_YEAR:
      from.subtract(1, `year`);
      break;
    case _3_YEARS:
      from.subtract(3, `years`);
      break;
    case _5_YEARS:
      from.subtract(5, `years`);
      break;
    case _10_YEARS:
      from.subtract(10, `years`);
      break;
  }

  if (!from.isBusinessDay() || from.isHoliday()) {
    from.prevBusinessDay();
  }

  return from;
}

module.exports = {
  update: getAlphaVantageData
};
