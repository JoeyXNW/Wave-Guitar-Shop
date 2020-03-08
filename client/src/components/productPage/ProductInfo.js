import React from "react";
import Button from "../utils/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const ProductInfo = props => {
  const { detail } = props;

  const showProdTage = detail => (
    <div className="product_tags">
      {detail.shipping && (
        <div className="tag">
          <FontAwesomeIcon icon={faTruck} />
          <div className="tag_text">
            <div>Free shipping</div>
            <div>and return</div>
          </div>
        </div>
      )}
      {detail.available && (
        <div className="tag">
          <FontAwesomeIcon icon={faCheck} />
          <div className="tag_text">
            <div>Available</div>
            <div>in store</div>
          </div>
        </div>
      )}
      {!detail.available && (
        <div className="tag">
          <FontAwesomeIcon icon={faTimes} />
          <div className="tag_text">
            <div>unavailable</div>
            <div>Preorder only</div>
          </div>
        </div>
      )}
    </div>
  );

  const showProdActions = detail => (
    <div className="product_actions">
      <div className="price">$ {detail.price}</div>
      <div className="cart">
        <Button
          type="add_to_cart_link"
          runAction={() => console.log("add to cart")}
        />
      </div>
    </div>
  );

  const showProdSpecifications = detail => (
    <div className="product_specifications">
      <h2>specifications</h2>
      <>
        <div className="item">
          <strong>Frets:</strong>
          {detail.frets}
        </div>
        <div className="item">
          <strong>Wood:</strong>
          {detail.wood.name}
        </div>
      </>
    </div>
  );

  return (
    <>
      <h1>
        {detail.brand.name} {detail.name}
      </h1>
      <p>{detail.description}</p>
      {showProdTage(detail)}
      {showProdActions(detail)}
      {showProdSpecifications(detail)}
    </>
  );
};

export default ProductInfo;
