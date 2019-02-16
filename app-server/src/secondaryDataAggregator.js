`use strict`;

const axios = require(`axios`);

const _YTD = `Year To Date`;
const _1_YEAR = `1 Year`;
const _3_YEARS = `3 Years`;
const _5_YEARS = `5 Years`;
const _10_YEARS = `10 Years`;

async function getIEXData(ticker, period) {
  /* eslint indent: ["error", 2, { "SwitchCase": 1 }]*/
  switch (period) {
    case _YTD:
      period = `ytd`;
      break;
    case _1_YEAR:
      period = `1y`;
      break;
    case _3_YEARS:
      period = `3y`;
      break;
    case _5_YEARS:
      period = `5y`;
      break;
    case _10_YEARS:
      period = `10y`;
      break;
  }
  const options = {
    method: `GET`,
    url: `https://cloud.iexapis.com/beta/stock/${ticker}/chart/${period}`,
    params: {
      token: process.env.IEX_API_KEY
    },
    resolveWithFullResponse: true
  };

  try {
    const response = await axios.request(options);

    console.info({
      status: response.status,
      message: response.statusText,
      data: response.data
    });
  }
  catch (error) {
    console.error({
      status: error.response.status,
      message: error.response.statusText,
      data: error.response.data
    });
  }
}

module.exports = {
  update: getIEXData
};
