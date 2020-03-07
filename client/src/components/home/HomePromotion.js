import React from "react";
import Button from "../utils/Button";

const HomePromotion = props => {
  const promotion = {
    img: "./images/featured/featured_home_3.jpg",
    title: "Up to 40% off",
    subtitle: "of Second hand guitars",
    linkTitle: "shop now",
    linkTo: "/shop"
  };

  const renderPromotion = () =>
    promotion && (
      <div
        className="home_promotion_img"
        style={{ background: `url(${promotion.img})` }}
      >
        <div className="tag title">{promotion.title}</div>
        <div className="tag low_title">{promotion.subtitle}</div>
        <div>
          <Button
            title={promotion.linkTitle}
            linkTo={promotion.linkTo}
            addStyles={{
              margin: "10px 0 0 0"
            }}
          />
        </div>
      </div>
    );

  return <div className="home_promotion">{renderPromotion()}</div>;
};

export default HomePromotion;
