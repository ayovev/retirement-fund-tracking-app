import React, { Component } from "react";
import "./TableContainer.css";
import Table from "../Table/Table.js";

export default class TableContainer extends Component {
  constructor(props) {
    super(props);
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
        {
          this.state.funds.map((item, id) => {
            return (
              <React.Fragment key={id}>
                <br/>
                <h4 style={{ fontFamily: `Open Sans` }}><b>{item.fundType}</b></h4>
                <Table class="table-spacing" key={id} tableData={item}/>
              </React.Fragment>
            );
          })
        }
      </div>
    );
  }
}
