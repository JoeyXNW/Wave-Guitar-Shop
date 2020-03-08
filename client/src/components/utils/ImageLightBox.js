import React, { Component } from "react";
import Lightbox from "react-image-lightbox";

class ImageLightBox extends Component {
  state = {
    isOpen: true,
    photoIndex: this.props.pos,
    images: [...this.props.images]
  };

  // static getDerivedStateFromProps(props, state) {
  //   if (!props.images) return false;

  //   const images = [];
  //   props.images.forEach(element => images.push({ src: `${element}` }));
  //   return (state = { images });
  // }

  closeLightBox = () => {
    this.props.onclose();
  };

  goToPrevious = () => {
    this.setState({
      photoIndex: this.state.currentImage - 1
    });
  };

  goToNext = () => {
    this.setState({
      photoIndex: this.state.currentImage + 1
    });
  };

  render() {
    // console.log(this.sta;
    const { photoIndex, images } = this.state;
    return (
      <Lightbox
        mainSrc={images[photoIndex]}
        nextSrc={images[(photoIndex + 1) % images.length]}
        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
        onCloseRequest={this.closeLightBox}
        onMovePrevRequest={this.goToPrevious}
        onMoveNextRequest={this.goToNext}
      />
    );
  }
}

export default ImageLightBox;
