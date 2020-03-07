import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/home";
import RegisterLogin from "./components/register_login";
import Register from "./components/register_login/Register";
import UserDashboard from "./components/userDashboard";
import Auth from "./hoc/Auth";
import Layout from "./hoc/Layout";
import Shop from "./components/shop";
import AddProducts from "./components/userDashboard/Admin/AddProducts";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Auth(Home)} />
        <Route exact path="/shop" component={Auth(Shop)} />
        <Route
          exact
          path="/register_login"
          component={Auth(RegisterLogin, false)}
        />
        <Route exact path="/register" component={Auth(Register, false)} />
        <Route
          exact
          path="/user/dashboard"
          component={Auth(UserDashboard, true)}
        />
        <Route
          exact
          path="/admin/add_product"
          component={Auth(AddProducts, true, true)}
        />
      </Switch>
    </Layout>
  );
};

export default Routes;
