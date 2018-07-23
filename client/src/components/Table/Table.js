import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './Table.css';

class Table extends Component {

  render() {
    const getReturn = function getReturn(cell, row, index) {
      let returnItem = cell.find(item => item.year === index);
      return !returnItem ? 0 : returnItem.value;
    }

    return (
      <BootstrapTable data={this.props.tableData.shares} striped hover condensed version='4'>
        <TableHeaderColumn dataField='ticker' isKey>Ticker</TableHeaderColumn>
        <TableHeaderColumn dataField='type'>{this.props.tableData.sharesType}</TableHeaderColumn>
        <TableHeaderColumn dataField='risk'>Risk</TableHeaderColumn>
        <TableHeaderColumn dataField='return'>Return</TableHeaderColumn>
        <TableHeaderColumn dataField='expenseRatio'>Expense Ratio</TableHeaderColumn>
        <TableHeaderColumn dataField='returns' dataFormat={getReturn} formatExtraData={0}>YTD Return</TableHeaderColumn>
        <TableHeaderColumn dataField='returns' dataFormat={getReturn} formatExtraData={1}>1 Year Return </TableHeaderColumn>
        <TableHeaderColumn dataField='returns' dataFormat={getReturn} formatExtraData={3}>3 Year Return</TableHeaderColumn>
        <TableHeaderColumn dataField='returns' dataFormat={getReturn} formatExtraData={5}>5 Year Return</TableHeaderColumn>
        <TableHeaderColumn dataField='returns' dataFormat={getReturn} formatExtraData={10}>10 Year Return</TableHeaderColumn>
        <TableHeaderColumn dataField='rating'>Rating</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default Table;
