import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const myLinks = [
  { name: "my account", linkTo: "/user/dashboard" },
  { name: "user information", linkTo: "/user/user_profile" },
  { name: "my cart", linkTo: "/user/cart" }
];

const adminLinks = [
  {
    name: "Site info",
    linkTo: "/admin/site_info"
  },
  {
    name: "Add products",
    linkTo: "/admin/add_product"
  },
  {
    name: "Manage categories",
    linkTo: "/admin/manage_categories"
  }
];

const UserLayout = props => {
  const generateLinks = links =>
    links.map((link, i) => (
      <Link key={i} to={link.linkTo}>
        {link.name}
      </Link>
    ));

  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          <h2>My account</h2>
          <div className="links">{generateLinks(myLinks)}</div>
          {props.user.isAdmin && (
            <>
              <h2>Admin Setting</h2>
              <div className="links">{generateLinks(adminLinks)}</div>
            </>
          )}
        </div>
        <div className="user_right">{props.children}</div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { user: state.user.userData };
};

export default connect(mapStateToProps)(UserLayout);
