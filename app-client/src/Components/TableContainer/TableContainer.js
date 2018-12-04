import React, { Component } from "react";
import "./TableContainer.css";
import Table from "../Table/Table.js";

export default class TableContainer extends Component {
  constructor() {
    super();
    this.state = {
      funds: []
    };
  }

  async componentDidMount() {
    let response = await fetch(`/api/funds`);
    let funds = await response.json();
    this.setState({
      funds
    });
  }

  render() {
    return (
      <div className="App">
        <p className="Table-header">401k Tracking & Analysis</p>
        {
          this.state && this.state.funds && this.state.funds.map((item, id) =>
            <Table class="table-spacing" key={id} tableData={item}></Table>)
        }
      </div>
    );
  }
}
