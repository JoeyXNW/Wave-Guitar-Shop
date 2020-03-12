import { CircularProgress } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../actions/user_actions";

import {
  clearProductDetail,
  getGuitarById
} from "../../actions/product_actions";
import PageTop from "../utils/PageTop";
import ProductImg from "./ProductImg";
import ProductInfo from "./ProductInfo";

class ProductPage extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.dispatch(getGuitarById(id)).then(res => {
      if (!this.props.guitar) this.props.history.push("/shop");
    });
    this.setState({ isLoading: false });
  }

  componentWillUnmount() {
    this.props.dispatch(clearProductDetail());
  }

  addToCart = id => {
    this.props.dispatch(addToCart(id));
  };

  render() {
    return (
      <>
        <PageTop title="product detail" />
        <div className="container">
          {this.props.isLoading && (
            <CircularProgress style={{ color: "#00bcd4" }} thickness={7} />
          )}
          {!this.props.isLoading && this.props.guitar && (
            <div className="product_detail_wrapper">
              <div className="left">
                <div style={{ width: "500px" }}>
                  <ProductImg detail={this.props.guitar} />
                </div>
              </div>
              <div className="right">
                <ProductInfo
                  detail={this.props.guitar}
                  user={this.props.user}
                  addToCart={id => this.addToCart(id)}
                />
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { guitar: state.products.guitar, user: state.user.userData };
};

export default connect(mapStateToProps)(ProductPage);
