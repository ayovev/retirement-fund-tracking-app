import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './../styles/table.css';
import './../styles/react-bootstrap-table.css';



class Table extends Component {
  render() {
    return (
      <div>
        <BootstrapTable data={ this.props.tableData[0].shares } striped hover condensed>
            <TableHeaderColumn dataField='ticker' isKey>Ticker</TableHeaderColumn>
            <TableHeaderColumn dataField='type'>{ this.props.tableData[0].sharestype }</TableHeaderColumn>
            <TableHeaderColumn dataField='risk'>Risk</TableHeaderColumn>
            <TableHeaderColumn dataField='return'>Return</TableHeaderColumn>
            <TableHeaderColumn dataField='expenseRatio'>Expense Ratio</TableHeaderColumn>
            <TableHeaderColumn dataField='ytdReturn'>YTD Return</TableHeaderColumn>
            <TableHeaderColumn dataField='oneYearReturn'>1 Year Return </TableHeaderColumn>
            <TableHeaderColumn dataField='threeYearReturn'>3 Year Return</TableHeaderColumn>
            <TableHeaderColumn dataField='fiveYearReturn'>5 Year Return</TableHeaderColumn>
            <TableHeaderColumn dataField='tenYearReturn'>10 Year Return</TableHeaderColumn>
            <TableHeaderColumn dataField='rating'>Rating</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default Table;
