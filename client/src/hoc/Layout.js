import React, { Component } from "react";
import Header from "../components/header_footer/header";
import Footer from "../components/header_footer/footer";
import { connect } from "react-redux";
import { getSiteInfo } from "../actions/site_actions";

class Layout extends Component {
  state = {};

  componentDidMount() {
    if (Object.keys(this.props.site).length !== 0) return;

    this.props.dispatch(getSiteInfo());
  }
  render() {
    return (
      <>
        <Header />
        <div className="page_container">{this.props.children}</div>
        <Footer data={this.props.site} />
      </>
    );
  }
}
const mapStateToProps = state => {
  return { site: state.site };
};
export default connect(mapStateToProps)(Layout);
