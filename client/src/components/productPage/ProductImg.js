import React, { Component } from "react";
// import ImageLightBox from "../utils/ImageLightBox";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class ProductImg extends Component {
  state = {
    isOpen: false,
    photoIndex: 0,
    lightboxImg: []
  };

  componentDidMount() {
    const lightboxImg = [];
    this.props.detail.images.map(item => lightboxImg.push(item.url));
    this.setState({ lightboxImg });
  }

  renderCardImage = images => {
    if (!images.length) return `/images/image_not_available.png`;

    return images[0].url;
  };

  handleLightBox = imgIndex => {
    if (!this.props.detail.images.length) return;

    return this.setState({ isOpen: true, photoIndex: imgIndex });
  };

  HandleLightBoxClose = () => {
    this.setState({ isOpen: false });
  };

  showThumbs = () =>
    this.state.lightboxImg.map((image, i) => {
      if (i === 0) return;
      return (
        <div
          key={i}
          onClick={() => this.handleLightBox(i)}
          className="thumb"
          style={{ background: `url(${image}) no-repeat` }}
        ></div>
      );
    });

  //////////////////////////////////////// For Lightbox
  goToPrevious = () => {
    const { photoIndex, lightboxImg } = this.state;
    return this.setState({
      photoIndex: (photoIndex + lightboxImg.length - 1) % lightboxImg.length
    });
  };

  goToNext = () => {
    const { photoIndex, lightboxImg } = this.state;
    return this.setState({
      photoIndex: (photoIndex + 1) % lightboxImg.length
    });
  };

  closeLightBox = () => {
    this.setState({ isOpen: false });
  };
  ////////////////////////////////////////////////

  render() {
    const { detail } = this.props;
    const { lightboxImg, photoIndex } = this.state;
    return (
      <div className="product_image_container">
        <div className="main_pic">
          <div
            style={{
              background: `url(${this.renderCardImage(
                detail.images
              )}) no-repeat`
            }}
            onClick={() => this.handleLightBox(0)}
          ></div>
        </div>
        <div className="main_thumbs">{this.showThumbs(detail)}</div>
        {this.state.isOpen && (
          <Lightbox
            mainSrc={lightboxImg[photoIndex]}
            nextSrc={lightboxImg[(photoIndex + 1) % lightboxImg.length]}
            prevSrc={
              lightboxImg[
                (photoIndex + lightboxImg.length - 1) % lightboxImg.length
              ]
            }
            onCloseRequest={this.closeLightBox}
            onMovePrevRequest={this.goToPrevious}
            onMoveNextRequest={this.goToNext}
          />
        )}
      </div>
    );
  }
}

export default ProductImg;
