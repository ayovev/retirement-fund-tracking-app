import React, { Component } from "react";
import { AuthenticationConsumer } from "../../Contexts/AuthenticationContext/AuthenticationContext";
import Header from "../Header/Header";
import Routes from "../Routes/Routes";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <AuthenticationConsumer>
        {({ logout, isAuthenticated }) => (
          <div className="App container">
            <Header isAuthenticated={ isAuthenticated } logout={ logout }/>
            <Routes />
          </div>
        )}
      </AuthenticationConsumer>
    );
  }
}
