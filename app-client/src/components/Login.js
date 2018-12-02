import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import md5 from "md5";
import { AuthenticationContext } from "../AuthenticationContext";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }
  validateForm = ()  => {
    return this.state.email.length > 6 && this.state.password.length > 6;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email: this.state.email,
      password: md5(this.state.password),
    };

    const config = {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    let response = await fetch('http://localhost:3002/api/login', config);

    switch (response.status) {
    case 401:
      alert('Incorrect Credentials');
      break;
<<<<<<< HEAD
    case 204:
      alert('User Does Not Exist');
      break;
    case 200:
      alert('Successfully Authenticated');
      this.props.history.push('/tables');
=======
    case 404:
      alert(`User Does Not Exist`);
      break;
    case 200:
      alert(`Successfully Authenticated`);
      this.context.login();
>>>>>>> b2f2d4d3b9221ccd464e36278f26b982862d2f9b
      break;
    default:
      alert(`Unkown Error ${response.status}`);
      break;
    }
  }

  render() {
    return (
          <div className="Login">
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="email" bsSize="large">
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  autoFocus
                  value={this.state.email}
                  onChange={this.handleChange}
                  type="email"
                />
              </FormGroup>
              <FormGroup controlId="password" bsSize="large">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                />
              </FormGroup>
              <Button
                block
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit">
                Login
              </Button>
            </form>
          </div>
    );
  }
}

Login.contextType = AuthenticationContext;
