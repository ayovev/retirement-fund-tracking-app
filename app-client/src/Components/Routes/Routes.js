import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Login/Login";
import TablesContainer from "../TableContainer/TableContainer";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

export default () =>
  <Switch>
    <Route path="/" exact component={ Home } />
    <ProtectedRoute path="/tables" exact component={ TablesContainer } />
    <Route path="/signup" exact component={ Home } />
    <Route path="/login" exact component={ Login } />
  </Switch>;
