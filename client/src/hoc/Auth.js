import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../actions/user_actions";
import { CircularProgress } from "@material-ui/core";

//composed component a function that returns a function
// reload: private (true) or public (false) route
export default function(ComposedClass, authRoute = null, adminRoute = null) {
  class AuthentificationCheck extends Component {
    state = {
      loading: true
    };

    componentDidMount() {
      this.props.dispatch(auth()).then(res => {
        let user = this.props.user.userData;

        if (authRoute && !user.isAuth) {
          this.props.history.push("/register_login");
        }
        if (
          (user.isAuth && authRoute === false) ||
          (adminRoute && !user.isAdmin)
        ) {
          this.props.history.push("/user/dashboard");
        }

        this.setState({ loading: false });
      });
    }

    render() {
      if (this.state.loading) {
        return (
          <div className="main_loader">
            <CircularProgress style={{ color: "#2196F3" }} thickness={7} />
          </div>
        );
      }
      return <ComposedClass {...this.props} user={this.props.user} />;
    }
  }

  function mapStateToProps(state) {
    return { user: state.user };
  }

  return connect(mapStateToProps)(AuthentificationCheck);
}
