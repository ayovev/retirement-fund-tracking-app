import React, { Component } from "react";
import Table from "../Table/Table.js";

export default class TableContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      funds: [],
      fundTypes: undefined
    };
  }

  async componentDidMount() {
    const response = await fetch(`/api/funds`);
    const funds = await response.json();
    const fundTypes = await this.mapFundTypes(funds);

    this.setState({
      funds,
      fundTypes
    });
  }

  mapFundTypes = async (funds) => {
    const fundTypes = new Map();

    funds.map((fund) => {
      const funds = fundTypes.get(fund.type);
      if (funds === undefined) {
        return fundTypes.set(fund.type, Array(fund));
      }
      else {
        funds.push(fund);
        return fundTypes.set(fund.type, funds);
      }
    });

    return fundTypes;
  }

  render() {
    const { fundTypes } = this.state;

    if (fundTypes === undefined) {
      return null;
    }
    else {
      const fundTypesArray = Array.from(fundTypes.values());
      const fundTypesLabelsArray = Array.from(fundTypes.keys());

      return (
        fundTypesArray.map((funds, index) => {
          return (
            <React.Fragment key={index}>
              <br/>
              <p style={{ fontFamily: `Open Sans`, width: `auto` }}><b>{fundTypesLabelsArray[index]}</b></p>
              <Table tableData={funds}/>
              <br/>
            </React.Fragment>
          );
        })
      );
    }
  }
}
