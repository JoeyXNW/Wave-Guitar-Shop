import React, { Component } from "react";
import PageTop from "../utils/PageTop";
import { connect } from "react-redux";
import CollapsCheckBox from "../utils/CollapseCheckBox";
import { frets, prices } from "../utils/form/FixedCategories";
import LoadMoreCards from "./LoadMoreCards";
import {
  getBrands,
  getWoods,
  getProductsToShop
} from "../../actions/product_actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTh } from "@fortawesome/free-solid-svg-icons";

class Shop extends Component {
  state = {
    grid: false,
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      fret: [],
      wood: [],
      price: []
    }
  };

  componentDidMount() {
    this.props.dispatch(getBrands());
    this.props.dispatch(getWoods());
    this.props.dispatch(
      getProductsToShop(this.state.skip, this.state.limit, this.state.filters)
    );
  }

  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;

    if (category === "price") {
      let priceValue = prices.find(price => price._id === filters).array;
      newFilters[category] = priceValue;
    }

    this.showFilteredResult(newFilters);

    this.setState({ filters: newFilters });
  };

  showFilteredResult = filters => {
    this.props
      .dispatch(getProductsToShop(0, this.state.limit, filters))
      .then(() => this.setState({ skip: 0 }));
  };

  loadMore = () => {
    let skip = this.state.skip + this.state.limit;

    this.props
      .dispatch(
        getProductsToShop(
          skip,
          this.state.limit,
          this.state.filters,
          this.props.products.toShop
        )
      )
      .then(() => this.setState({ skip }));
  };

  handleGrids = () =>
    this.setState({ grid: !this.state.grid ? "grid_bars" : "" });

  render() {
    const products = this.props.products;
    return (
      <>
        <PageTop title="browse products" />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapsCheckBox
                open={true}
                title="Brands"
                list={products.brands}
                handleFilters={filters => this.handleFilters(filters, "brand")}
              />
              <CollapsCheckBox
                open={false}
                title="Frets"
                list={frets}
                handleFilters={filters => this.handleFilters(filters, "fret")}
              />
              <CollapsCheckBox
                open={true}
                title="Woods"
                list={products.woods}
                handleFilters={filters => this.handleFilters(filters, "wood")}
              />
              <CollapsCheckBox
                open={false}
                title="Prices"
                list={prices}
                handleFilters={filters => this.handleFilters(filters, "price")}
              />
            </div>
            <div className="right">
              <div className="shop_options">
                <div className="shop_grids clear">
                  <div
                    className={`grid_btn ${!this.state.grid ? "" : "active"}`}
                    onClick={this.handleGrids}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </div>
                  <div
                    className={`grid_btn ${this.state.grid ? "" : "active"}`}
                    onClick={this.handleGrids}
                  >
                    <FontAwesomeIcon icon={faTh} />
                  </div>
                </div>
              </div>
              <LoadMoreCards
                grid={this.state.grid}
                limit={this.state.limit}
                list={products.toShop}
                size={products.toShopSize}
                loadMore={this.loadMore}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { products: state.products };
};

export default connect(mapStateToProps)(Shop);
