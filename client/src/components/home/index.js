import React, { Component } from "react";
import HomePromotion from "./HomePromotion";
import HomeSlider from "./HomeSlider";
import { connect } from "react-redux";
import {
  getProductByArrival,
  getProductBySell
} from "../../actions/product_actions";
import CardBlock from "../utils/card/CardBlock";

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getProductByArrival());
    this.props.dispatch(getProductBySell());
  }

  render() {
    return (
      <div>
        <HomeSlider />
        <CardBlock list={this.props.products.bySell} title="best selling" />
        <HomePromotion />
        <CardBlock list={this.props.products.byArrival} title="new arrival" />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { products: state.products };
};

export default connect(mapStateToProps)(Home);
