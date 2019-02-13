import React, { Component } from "react";

export default class Status extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      status: undefined
    };
  }

  async componentDidMount() {
    const response = await fetch(`/api/status`);
    const status = response.status;

    this.setState({ status });
  }

  render() {
    return (
      <h1>{this.state.status}</h1>
    );
  }
}
