import React, { Component } from 'react';
import './styles/App.css';
import Table from './components/Table/Table.js'

class App extends Component {

  constructor() {
    super();
    this.state = {
      shares: []
    };
  }

  componentDidMount() {
    this.callApi()
      .then(res => {
        this.setState({ shares: res });
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/shares');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  };

  render() {
    return (
      <div sharestype="App">
        <p sharestype="Table-header">401k Tracking & Analysis</p>
        {
          this.state && this.state.shares && this.state.shares.map((item, id) =>
            <Table key={id} tableData={item}></Table>
          )}

      </div>
    );
  }
}

export default App;
