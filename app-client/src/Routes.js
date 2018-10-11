import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./components/Login";
import TablesContainer from "./containers/TablesContainer";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from './components/ProtectedRoute'

export default () =>
<AuthProvider>
  <Switch>
    <Route path="/" exact component={Home} />
    <ProtectedRoute path="/tables" exact component={ TablesContainer} />
    <Route path="/signup" exact component={ Home } />
    <Route path="/login" exact component={ Login } />
  </Switch>
</AuthProvider>;
