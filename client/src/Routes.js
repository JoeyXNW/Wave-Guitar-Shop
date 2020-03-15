import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/home";
import ProductPage from "./components/productPage";
import RegisterLogin from "./components/register_login";
import Register from "./components/register_login/Register";
import Shop from "./components/shop";
import UserDashboard from "./components/userDashboard";
import AddProducts from "./components/userDashboard/Admin/AddProducts";
import ManageCategories from "./components/userDashboard/Admin/ManageCategories";
import Auth from "./hoc/Auth";
import Layout from "./hoc/Layout";
import UserCart from "./components/userDashboard/UserCart";
import UpdateProfile from "./components/userDashboard/UpdateProfile";
import ManageSite from "./components/userDashboard/Admin/ManageSite";
import ResetUser from "./components/resetUser";
import PageNotFound from "./components/utils/PageNotFound";
import ResetPassword from "./components/resetUser/ResetPassword";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Auth(Home)} />
        <Route exact path="/product_detail/:id" component={Auth(ProductPage)} />
        <Route exact path="/shop" component={Auth(Shop)} />

        <Route
          exact
          path="/register_login"
          component={Auth(RegisterLogin, false)}
        />
        <Route exact path="/register" component={Auth(Register, false)} />
        <Route exact path="/reset_user" component={Auth(ResetUser, false)} />
        <Route
          exact
          path="/reset_password/:token"
          component={Auth(ResetPassword, false)}
        />
        <Route
          exact
          path="/user/dashboard"
          component={Auth(UserDashboard, true)}
        />
        <Route
          exact
          path="/user/user_profile"
          component={Auth(UpdateProfile, true)}
        />
        <Route exact path="/user/cart" component={Auth(UserCart, true)} />
        <Route
          exact
          path="/admin/add_product"
          component={Auth(AddProducts, true, true)}
        />
        <Route
          exact
          path="/admin/manage_categories"
          component={Auth(ManageCategories, true, true)}
        />
        <Route
          exact
          path="/admin/site_info"
          component={Auth(ManageSite, true, true)}
        />
        <Route component={Auth(PageNotFound)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
