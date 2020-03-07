import React from "react";
import Slider from "react-slick";
import Button from "../utils/Button";

const HomeSlider = props => {
  const slides = [
    {
      img: "./images/featured/featured_home.jpg",
      title: "Fender",
      subtitle: "Custom shop",
      linkTitle: "Shop now",
      linkTo: "/shop"
    },
    {
      img: "./images/featured/featured_home_2.jpg",
      title: "B-Stock",
      subtitle: "Awesome discounts",
      linkTitle: "View offers",
      linkTo: "/shop"
    }
  ];

  const generateSlides = () =>
    slides &&
    slides.map((slide, i) => (
      <div key={i}>
        <div
          className="featured_image"
          style={{
            background: `url(${slide.img})`,
            height: `${window.innerHeight}px`
          }}
        >
          <div className="featured_action">
            <div className="tag title">{slide.title}</div>
            <div className="tag low_title">{slide.subtitle}</div>
            <div>
              <Button
                title={slide.linkTitle}
                linkTo={slide.linkTo}
                addStyles={{
                  margin: "10px 0 0 0"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <div className="featured_container">
      <Slider {...settings}>{generateSlides()}</Slider>
    </div>
  );
};

export default HomeSlider;
