import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "./Table.css";

export default class Table extends Component {
  render() {
    const getReturn = (cell, row, index) => {
      let returnItem = cell.find((item) => item.period === index);
      return !returnItem ? 0 : returnItem.value;
    };

    return (
      <BootstrapTable data={this.props.tableData.funds} hover>
        <TableHeaderColumn width="100" dataField="ticker" isKey>Ticker</TableHeaderColumn>
        <TableHeaderColumn width="300" dataField="name">Name</TableHeaderColumn>
        <TableHeaderColumn width="100" dataField="risk">Risk</TableHeaderColumn>
        <TableHeaderColumn width="100" dataField="return">Return</TableHeaderColumn>
        <TableHeaderColumn width="150" dataField="expenseRatio">Expense Ratio</TableHeaderColumn>
        <TableHeaderColumn width="150" dataField="returns" dataFormat={getReturn} formatExtraData={0}>YTD Return</TableHeaderColumn>
        <TableHeaderColumn width="150" dataField="returns" dataFormat={getReturn} formatExtraData={1}>1 Year Return </TableHeaderColumn>
        <TableHeaderColumn width="150" dataField="returns" dataFormat={getReturn} formatExtraData={3}>3 Year Return</TableHeaderColumn>
        <TableHeaderColumn width="150" dataField="returns" dataFormat={getReturn} formatExtraData={5}>5 Year Return</TableHeaderColumn>
        <TableHeaderColumn width="150" dataField="returns" dataFormat={getReturn} formatExtraData={10}>10 Year Return</TableHeaderColumn>
        <TableHeaderColumn width="100" dataField="rating">Rating</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
