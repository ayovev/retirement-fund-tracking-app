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

<<<<<<< HEAD
  componentDidMount() {
    fetch('http://localhost:3002/api//api/funds')
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        this.setState({ funds: body });
      })
      .catch((error) => {
        console.error(error);
      });
=======
  async componentDidMount() {
    let response = await fetch(`/api/funds`);
    let funds = await response.json();
    this.setState({
      funds
    });
>>>>>>> b2f2d4d3b9221ccd464e36278f26b982862d2f9b
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
