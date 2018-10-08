
import React from 'react';

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
    state = { isAuthenticated: false }
    render() {
      return (
        <AuthContext.Provider value={{ isAuthenticated: this.state.isAuthenticated }} >
          {this.props.children}
        </AuthContext.Provider>
      )
    }
  }
  const AuthConsumer = AuthContext.Consumer
  export { AuthProvider, AuthConsumer }