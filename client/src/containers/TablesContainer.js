import React, { Component } from 'react';
import './TablesContainer.css';
import Table from '../components/Table.js'

class TablesContainer extends Component {

  constructor() {
    super();
    this.state = {
      funds: []
    };
  }

  componentDidMount() {
    this.callApi()
      .then(res => {
        this.setState({ funds: res });
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/funds');
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
          this.state && this.state.funds && this.state.funds.map((item, id) =>
            <Table class="table-spacing" key={id} tableData={item}></Table>
          )}
      </div>
    );
  }
}

export default TablesContainer;
