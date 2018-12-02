import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthenticationConsumer } from '../AuthenticationContext'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthenticationConsumer>
    {({ isAuthenticated }) => (
      <Route
        render={props =>
          isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
        }
        {...rest}
      />
    )}
  </AuthenticationConsumer>
)

export default ProtectedRoute
