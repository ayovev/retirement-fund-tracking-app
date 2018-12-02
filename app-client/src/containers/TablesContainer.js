import React, { Component } from "react";
import "./TablesContainer.css";
import Table from "../components/Table.js";

class TablesContainer extends Component {
  constructor() {
    super();
    this.state = {
      funds: [],
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
            <Table class="table-spacing" key={id} tableData={item}></Table>
          )}
      </div>
    );
  }
}

export default TablesContainer;
