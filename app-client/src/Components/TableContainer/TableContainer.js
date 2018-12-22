import React, { Component } from "react";
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
      <React.Fragment>
        {
          this.state.funds.map((item, id) => {
            return (
              <React.Fragment key={id}>
                <br/>
                <p style={{ fontFamily: `Open Sans`, width: `auto` }}><b>{item.fundType}</b></p>
                <Table key={id} tableData={item}/>
              </React.Fragment>
            );
          })
        }
      </React.Fragment>
    );
  }
}
