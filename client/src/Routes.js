import React, { Component } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home";
import RegisterLogin from "./components/register_login";

const Routes = () => {
  return (
    <Switch>
      <Route exact to="/register_login" component={RegisterLogin} />
      <Route to="/" exact component={Home} />
    </Switch>
  );
};

export default Routes;
