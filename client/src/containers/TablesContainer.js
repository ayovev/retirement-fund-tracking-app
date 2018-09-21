import React, { Component } from "react";
import "./TablesContainer.css";
import Table from "../components/Table.js";

class TablesContainer extends Component {

  constructor() {
    super();
    this.state = {
      funds: []
    };
  }

  componentDidMount() {
    fetch(`/api/funds`)
    .then(response => {
      return response.json();
    })
    .then(body => {
      this.setState({funds: body});
    })
    .catch(error => {
      console.error(error);
    })
  }

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
