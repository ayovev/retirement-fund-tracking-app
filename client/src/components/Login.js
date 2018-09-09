import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './Login.css'
import md5 from 'md5'

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 6;
    }

    handleChange = event => {        
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        
        const data = { "email": this.state.email, "password": md5(this.state.password)}
        
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }

        let response = await fetch('/api/login', config);

        //TODO: This logic should be thought about a bit on how we wish to handle no !200
        if (response.status === 401) {
            alert('Incorrect credentials');
        }
        else if(response.status !== 200){
            console.log('Something happened');
        }
        else {
                    //TODO store user info in storage https://hackernoon.com/how-to-take-advantage-of-local-storage-in-your-react-projects-a895f2b2d3f2
        let body = await response.json();

        this.props.history.push('/');
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
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
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


