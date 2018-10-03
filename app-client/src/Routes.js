import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./components/Login";
import TablesContainer from "./containers/TablesContainer";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/tables" exact component={TablesContainer} />
    <Route path="/signup" exact component={Home} />
    <Route path="/login" exact component={Login} />
  </Switch>;
