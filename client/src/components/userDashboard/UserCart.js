import { faFrown, faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getCartItem,
  removeCartItem,
  orderSuccess
} from "../../actions/user_actions";
import UserLayout from "../../hoc/UserLayout";
import Paypal from "../utils/Paypal";
import ProductBlock from "../utils/user/ProductBlock";

//AddGeL6nBEbDgEfeHHZU8OT8J89Nuz7NXWhhExEpf5nb_O-4e76RnVICWH4h8Z2rsC3ok5TLh1QQXAuz
class UserCart extends Component {
  state = {
    loading: true,
    showSuccess: false,
    total: 0,
    showTotal: false
  };

  componentDidMount() {
    let cartItem = [];
    let user = this.props.user.userData;

    if (!user.cart || !user.cart.length) return;

    user.cart.forEach(item => cartItem.push(item.id));
    this.props.dispatch(getCartItem(cartItem, user.cart)).then(() => {
      this.calculateTotal();
    });
  }

  calculateTotal = () => {
    let total = 0;
    let cart = this.props.user.cartDetail;
    cart.forEach(item => (total += parseInt(item.price, 10) * item.quantity));

    this.setState({ total, showTotal: true });
  };

  showNoItemMessage = () => (
    <div className="cart_no_items">
      <FontAwesomeIcon icon={faFrown} />
      <div style={{ textTransform: "uppercase" }}>You have no items</div>
    </div>
  );

  showSuccessMessage = () => (
    <div className="cart_success">
      <FontAwesomeIcon icon={faSmile} />
      <div style={{ textTransform: "uppercase" }}>
        Your order has been placed successfully
      </div>
    </div>
  );

  removeFromCart = id => {
    const { cartDetail } = this.props.user;
    this.props.dispatch(removeCartItem(id)).then(() => {
      if (cartDetail.length <= 0) return this.setState({ showTotal: false });

      this.calculateTotal(cartDetail);
    });
  };

  transactionError = () => {};

  transactionCancelled = () => {};

  transactionSuccess = data => {
    this.props
      .dispatch(
        orderSuccess({
          cartDetail: this.props.user.cartDetail,
          paymentData: data
        })
      )
      .then(() => {
        if (this.props.user.success) {
          this.setState({ showTotal: false, showSuccess: true });
        }
      });
  };

  render() {
    const { showTotal, total, showSuccess } = this.state;
    return (
      <UserLayout>
        <h1>My Cart</h1>
        <div className="user_cart">
          <ProductBlock
            products={this.props.user.cartDetail}
            type="cart"
            removeItem={id => this.removeFromCart(id)}
          />
          {showTotal && (
            <div className="user_cart_sum">Total amount: $ {total}</div>
          )}
          {!showTotal && !showSuccess && this.showNoItemMessage()}
          {!showTotal && showSuccess && this.showSuccessMessage()}
        </div>
        {showTotal && (
          <div className="paypal_button_container">
            <Paypal
              toPay={total}
              transactionError={data => this.transactionError(data)}
              transactionCancelled={data => this.transactionCancelled(data)}
              onSuccess={data => this.transactionSuccess(data)}
            />
          </div>
        )}
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(UserCart);
