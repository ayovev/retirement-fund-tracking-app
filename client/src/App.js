import React, { Component } from 'react';
import './styles/App.css';
import Table from './components/Table/Table.js'

var dataResponse = [
  {
    id: 1, sharestype: 'Multi-Asset',
    shares: [
      {
        ticker: "vtivx", type: "Vanguard Target Requirement", risk: "LM", riskType: 1, return: "MH", returnType: "1", expenseRatio: 0.15,
        ytdReturn: 2.27, oneYearReturn: 11.7, threeYearReturn: 9.04, fiveYearReturn: 9.49, tenYearReturn: 5.67, rating: 4, quoteLink: "http://beta.morningstar.com/funds/xnas/vtivx/quote.html"
      },
      {
        ticker: "vtivx", type: "Vanguard Target Requirement", risk: "LM", riskType: 1, return: "MH", returnType: "1", expenseRatio: 0.15,
        ytdReturn: 2.27, oneYearReturn: 11.7, threeYearReturn: 9.04, fiveYearReturn: 9.49, tenYearReturn: 5.67, rating: 4, quoteLink: "http://beta.morningstar.com/funds/xnas/vtivx/quote.html"
      },
      {
        ticker: "vtivx", type: "Vanguard Target Requirement", risk: "LM", riskType: 1, return: "MH", returnType: "1", expenseRatio: 0.15,
        ytdReturn: 2.27, oneYearReturn: 11.7, threeYearReturn: 9.04, fiveYearReturn: 9.49, tenYearReturn: 5.67, rating: 4, quoteLink: "http://beta.morningstar.com/funds/xnas/vtivx/quote.html"
      },
      {
        ticker: "vtivx", type: "Vanguard Target Requirement", risk: "LM", riskType: 1, return: "MH", returnType: "1", expenseRatio: 0.15,
        ytdReturn: 2.27, oneYearReturn: 11.7, threeYearReturn: 9.04, fiveYearReturn: 9.49, tenYearReturn: 5.67, rating: 4, quoteLink: "http://beta.morningstar.com/funds/xnas/vtivx/quote.html"
      }
    ]
  },
  {
    id: 2, sharestype: 'Equities (Passive)',
    shares: [
      {
        ticker: "vtivx", type: "Vanguard Target Requirement", risk: "LM", riskType: 1, return: "MH", returnType: "1", expenseRatio: 0.15,
        ytdReturn: 2.27, oneYearReturn: 11.7, threeYearReturn: 9.04, fiveYearReturn: 9.49, tenYearReturn: 5.67, rating: 4, quoteLink: "http://beta.morningstar.com/funds/xnas/vtivx/quote.html"
      },
      {
        ticker: "vtivx", type: "Vanguard Target Requirement", risk: "LM", riskType: 1, return: "MH", returnType: "1", expenseRatio: 0.15,
        ytdReturn: 2.27, oneYearReturn: 11.7, threeYearReturn: 9.04, fiveYearReturn: 9.49, tenYearReturn: 5.67, rating: 4, quoteLink: "http://beta.morningstar.com/funds/xnas/vtivx/quote.html"
      },
      {
        ticker: "vtivx", type: "Vanguard Target Requirement", risk: "LM", riskType: 1, return: "MH", returnType: "1", expenseRatio: 0.15,
        ytdReturn: 2.27, oneYearReturn: 11.7, threeYearReturn: 9.04, fiveYearReturn: 9.49, tenYearReturn: 5.67, rating: 4, quoteLink: "http://beta.morningstar.com/funds/xnas/vtivx/quote.html"
      },
      {
        ticker: "vtivx", type: "Vanguard Target Requirement", risk: "LM", riskType: 1, return: "MH", returnType: "1", expenseRatio: 0.15,
        ytdReturn: 2.27, oneYearReturn: 11.7, threeYearReturn: 9.04, fiveYearReturn: 9.49, tenYearReturn: 5.67, rating: 4, quoteLink: "http://beta.morningstar.com/funds/xnas/vtivx/quote.html"
      }
    ]
  },
  {
    id: 3, sharestype: 'Fixed Income (Passive)',
    shares: [
      {
        ticker: "vtivx", type: "Vanguard Target Requirement", risk: "LM", riskType: 1, return: "MH", returnType: "1", expenseRatio: 0.15,
        ytdReturn: 2.27, oneYearReturn: 11.7, threeYearReturn: 9.04, fiveYearReturn: 9.49, tenYearReturn: 5.67, rating: 4, quoteLink: "http://beta.morningstar.com/funds/xnas/vtivx/quote.html"
      },
      {
        ticker: "vtivx", type: "Vanguard Target Requirement", risk: "LM", riskType: 1, return: "MH", returnType: "1", expenseRatio: 0.15,
        ytdReturn: 2.27, oneYearReturn: 11.7, threeYearReturn: 9.04, fiveYearReturn: 9.49, tenYearReturn: 5.67, rating: 4, quoteLink: "http://beta.morningstar.com/funds/xnas/vtivx/quote.html"
      },
      {
        ticker: "vtivx", type: "Vanguard Target Requirement", risk: "LM", riskType: 1, return: "MH", returnType: "1", expenseRatio: 0.15,
        ytdReturn: 2.27, oneYearReturn: 11.7, threeYearReturn: 9.04, fiveYearReturn: 9.49, tenYearReturn: 5.67, rating: 4, quoteLink: "http://beta.morningstar.com/funds/xnas/vtivx/quote.html"
      },
      {
        ticker: "vtivx", type: "Vanguard Target Requirement", risk: "LM", riskType: 1, return: "MH", returnType: "1", expenseRatio: 0.15,
        ytdReturn: 2.27, oneYearReturn: 11.7, threeYearReturn: 9.04, fiveYearReturn: 9.49, tenYearReturn: 5.67, rating: 4, quoteLink: "http://beta.morningstar.com/funds/xnas/vtivx/quote.html"
      }
    ]
  },
  {
    id: 4, sharestype: 'Equities (Active)',
    shares: [
      {
        ticker: "vtivx", type: "Vanguard Target Requirement", risk: "LM", riskType: 1, return: "MH", returnType: "1", expenseRatio: 0.15,
        ytdReturn: 2.27, oneYearReturn: 11.7, threeYearReturn: 9.04, fiveYearReturn: 9.49, tenYearReturn: 5.67, rating: 4, quoteLink: "http://beta.morningstar.com/funds/xnas/vtivx/quote.html"
      },
      {
        ticker: "vtivx", type: "Vanguard Target Requirement", risk: "LM", riskType: 1, return: "MH", returnType: "1", expenseRatio: 0.15,
        ytdReturn: 2.27, oneYearReturn: 11.7, threeYearReturn: 9.04, fiveYearReturn: 9.49, tenYearReturn: 5.67, rating: 4, quoteLink: "http://beta.morningstar.com/funds/xnas/vtivx/quote.html"
      },
      {
        ticker: "vtivx", type: "Vanguard Target Requirement", risk: "LM", riskType: 1, return: "MH", returnType: "1", expenseRatio: 0.15,
        ytdReturn: 2.27, oneYearReturn: 11.7, threeYearReturn: 9.04, fiveYearReturn: 9.49, tenYearReturn: 5.67, rating: 4, quoteLink: "http://beta.morningstar.com/funds/xnas/vtivx/quote.html"
      },
      {
        ticker: "vtivx", type: "Vanguard Target Requirement", risk: "LM", riskType: 1, return: "MH", returnType: "1", expenseRatio: 0.15,
        ytdReturn: 2.27, oneYearReturn: 11.7, threeYearReturn: 9.04, fiveYearReturn: 9.49, tenYearReturn: 5.67, rating: 4, quoteLink: "http://beta.morningstar.com/funds/xnas/vtivx/quote.html"
      }
    ]
  },

  {
    id: 5, sharestype: 'Fixed Income (Active)',
    shares: [
      {
        ticker: "vtivx", type: "Vanguard Target Requirement", risk: "LM", riskType: 1, return: "MH", returnType: "1", expenseRatio: 0.15,
        ytdReturn: 2.27, oneYearReturn: 11.7, threeYearReturn: 9.04, fiveYearReturn: 9.49, tenYearReturn: 5.67, rating: 4, quoteLink: "http://beta.morningstar.com/funds/xnas/vtivx/quote.html"
      },
      {
        ticker: "vtivx", type: "Vanguard Target Requirement", risk: "LM", riskType: 1, return: "MH", returnType: "1", expenseRatio: 0.15,
        ytdReturn: 2.27, oneYearReturn: 11.7, threeYearReturn: 9.04, fiveYearReturn: 9.49, tenYearReturn: 5.67, rating: 4, quoteLink: "http://beta.morningstar.com/funds/xnas/vtivx/quote.html"
      },
      {
        ticker: "vtivx", type: "Vanguard Target Requirement", risk: "LM", riskType: 1, return: "MH", returnType: "1", expenseRatio: 0.15,
        ytdReturn: 2.27, oneYearReturn: 11.7, threeYearReturn: 9.04, fiveYearReturn: 9.49, tenYearReturn: 5.67, rating: 4, quoteLink: "http://beta.morningstar.com/funds/xnas/vtivx/quote.html"
      },
      {
        ticker: "vtivx", type: "Vanguard Target Requirement", risk: "LM", riskType: 1, return: "MH", returnType: "1", expenseRatio: 0.15,
        ytdReturn: 2.27, oneYearReturn: 11.7, threeYearReturn: 9.04, fiveYearReturn: 9.49, tenYearReturn: 5.67, rating: 4, quoteLink: "http://beta.morningstar.com/funds/xnas/vtivx/quote.html"
      }
    ]
  }
]


class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    // this.callApi()
    //   .then(res => this.setState({ response: res.express }))
    //   .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div sharestype="App">
        <p sharestype="Table-header">401k Tracking & Analysis</p>
        <Table tableData={dataResponse.filter(data => data.id === 1)} />
        <Table tableData={dataResponse.filter(data => data.id === 2)} />
        <Table tableData={dataResponse.filter(data => data.id === 3)} />
        <Table tableData={dataResponse.filter(data => data.id === 4)} />
        <Table tableData={dataResponse.filter(data => data.id === 5)} />
      </div>
    );
  }
}

export default App;
