import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AuthConsumer } from "./AuthContext";
import Routes from "./Routes";
import "./App.css";

class App extends Component {
  render() {
    return (
      <AuthConsumer>
        {({ isAuthenticated }) => (
          <div className="App container">
            <Navbar fluid collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/">Home</Link>
                </Navbar.Brand>

                {isAuthenticated && (
                  <Navbar.Brand>
                    <Link to="/tables">Tables</Link>
                  </Navbar.Brand>
                )}

                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav pullRight>
                  {!isAuthenticated && (
                    <LinkContainer to="/signup">
                      <NavItem>Signup</NavItem>
                    </LinkContainer>
                  )}
                  {!isAuthenticated && (
                    <LinkContainer to="/login">
                      <NavItem>Login</NavItem>
                    </LinkContainer>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Routes />
          </div>
        )}
      </AuthConsumer>
    );
  }
}

export default App;
