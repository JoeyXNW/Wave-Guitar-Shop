import React from "react";

const ProductBlock = ({ products, removeItem }) => {
  const renderCartImage = images => {
    if (!images.length) return "/images/image_not_available.png";

    return images[0].url;
  };

  const renderItem = () => {
    if (!products) return null;

    return products.map(product => (
      <div className="user_product_block" key={product._id}>
        <div className="item">
          <div
            className="image"
            style={{
              background: `url(${renderCartImage(product.images)}) no-repeat`
            }}
          ></div>
        </div>
        <div className="item">
          <h4>Product name</h4>
          <>
            {product.brand.name} {product.name}
          </>
        </div>
        <div className="item">
          <h4>Quantity</h4>
          {product.quantity}
        </div>
        <div className="item">
          <h4>Price</h4>
          <>${product.price}</>
        </div>
        <div className="item btn">
          <div
            className="cart_remove_btn"
            onClick={() => removeItem(product._id, product.quantity)}
          >
            Remove
          </div>
        </div>
      </div>
    ));
  };

  return <>{renderItem()}</>;
};

export default ProductBlock;
