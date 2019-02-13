import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Login/Login";
import TablesContainer from "../TableContainer/TableContainer";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Admin from "../Admin/Admin";
import Status from "../Status/Status";

export default () =>
  <Switch>
    <Route path="/" exact component={ Home } />
    <ProtectedRoute path="/tables" exact component={ TablesContainer } />
    <ProtectedRoute path="/admin" exact component= { Admin } />
    <Route path="/signup" exact component={ Home } />
    <Route path="/login" exact component={ Login } />
    <Route path="/status" exact component={ Status } />
  </Switch>;
