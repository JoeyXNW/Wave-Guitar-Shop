import React, { Component } from "react";
import Button from "../Button";
import { connect } from "react-redux";
import { addToCart } from "../../../actions/user_actions";

class Card extends Component {
  state = {};

  renderCardImage = images => {
    return images.length ? images[0].url : "/images/image_not_available.png";
  };

  render() {
    const props = this.props;
    return (
      <div className={`card_item_wrapper ${props.grid}`}>
        <div
          className="image"
          style={{ background: `url(${this.renderCardImage(props.images)})` }}
        ></div>
        <div className="action_container">
          <div className="tags">
            <div className="brand">{props.brand.name}</div>
            <div className="name">{props.name}</div>
            <div className="price">${props.price}</div>
          </div>
          {props.grid && <div className="description">{props.description}</div>}
          <div className="actions">
            <div className="button_wrapp">
              <Button
                linkTo={`/product_detail/${props._id}`}
                addStyles={{ margin: "10px 0 0 0" }}
                title="View Product"
                altClass="card_link"
              />
            </div>
            <div className="button_wrapp">
              <Button
                type="bag_link"
                runAction={() => {
                  props.user.userData.isAuth
                    ? this.props.dispatch(addToCart(props._id))
                    : console.log("log in first please");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Card);
