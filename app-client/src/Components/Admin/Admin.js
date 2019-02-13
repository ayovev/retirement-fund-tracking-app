import React, { Component } from "react";

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdministrator: false,
      loading: true
    };
  }

  async componentDidMount() {
    await this.checkPermission();
  }

  checkPermission = async () => {
    const response = await fetch(`/api/admin/permissions`);
    const role = await response.json();

    if (role === `administrator`) {
      this.setState({ loading: false, isAdministrator: true });
    }
    else {
      this.setState({ loading: false, isAdministrator: false });
    }
  }

  render() {
    const { isAdministrator, loading } = this.state;

    if (loading) {
      return <h1>Loading...</h1>;
    }
    else if (!loading && isAdministrator) {
      return (
        <React.Fragment>
          <h1>Admin Page</h1>
          <br/>
          <h2>Tools</h2>
          <ul>
            <li>Fund Association Tool</li>
          </ul>
        </React.Fragment>
      );
    }
    else {
      window.location.assign(`/`);
    }
  }
}
