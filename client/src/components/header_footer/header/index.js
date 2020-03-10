import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/user_actions";
import { withRouter } from "react-router-dom";

class Header extends Component {
  state = {
    page: [
      {
        name: "Home",
        linkTo: "/",
        public: true
      },
      {
        name: "Guitars",
        linkTo: "/shop",
        public: true
      }
    ],
    user: [
      {
        name: "My Cart",
        linkTo: "/user/cart",
        public: false
      },
      {
        name: "My Account",
        linkTo: "/user/dashboard",
        public: false
      },
      {
        name: "Log in",
        linkTo: "/register_login",
        public: true
      },
      {
        name: "Log out",
        linkTo: "/user/logout",
        public: false
      }
    ]
  };

  logoutHandler = () => {
    this.props.dispatch(logoutUser()).then(res => {
      if (res.payload.logoutSuccess) {
        this.props.history.push("/");
      }
    });
  };

  cartLink = (item, i) => {
    const user = this.props.user.userData;
    ////////////////////////fix later
    return (
      <div className="cart_link" key={i}>
        <span>{user.cartTotal}</span>
        <Link to={item.linkTo}>{item.name}</Link>
      </div>
    );
  };

  defaultLink = (item, i) =>
    item.name === "Log out" ? (
      <div className="log_out_link" key={i} onClick={this.logoutHandler}>
        {item.name}
      </div>
    ) : (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    );

  showLinks = types => {
    const user = this.props.user.userData;
    let list = [];

    if (user) {
      types.forEach(type => {
        if (
          (!user.isAuth && type.public) ||
          (user.isAuth && type.name !== "Log in")
        ) {
          list.push(type);
        }
      });
    }

    return list.map((item, i) => {
      if (item.name !== "My Cart") return this.defaultLink(item, i);
      return this.cartLink(item, i);
    });
  };

  render() {
    return (
      <header className="bck_b_light">
        <div className="container">
          <div className="left">
            <div className="logo">WAVES</div>
          </div>
          <div className="right">
            <div className="top">{this.showLinks(this.state.user)}</div>
            <div className="bottom">{this.showLinks(this.state.page)}</div>
          </div>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(withRouter(Header));
