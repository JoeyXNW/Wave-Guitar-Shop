import React, { Component } from "react";
import Header from "../components/header_footer/header";
import Footer from "../components/header_footer/footer";

class Layout extends Component {
  state = {};
  render() {
    return (
      <>
        <Header />
        <div className="page_container">{this.props.children}</div>
        <Footer />
      </>
    );
  }
}

export default Layout;
