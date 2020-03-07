import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { CircularProgress } from "@material-ui/core";
import { postImage, removeImage } from "../../../actions/cloudinary";
import axios from "axios";

class FileUpload extends Component {
  state = {
    uploadedFiles: [],
    uploading: false
  };

  onDropHandler = files => {
    this.setState({ uploading: true });

    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" }
    };
    formData.append("file", files[0]);

    postImage(formData, config).then(res => {
      this.setState(
        {
          uploading: false,
          uploadedFiles: [...this.state.uploadedFiles, res.data]
        },
        () => this.props.imageHandler(this.state.uploadedFiles)
      );
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (props.reset) {
      return (state = { uploadedFiles: [] });
    }
    return null;
  }

  onRemoveHandler = id => {
    removeImage(id).then(res => {
      let images = this.state.uploadedFiles.filter(file => {
        return file.public_id !== id;
      });
      this.setState({ uploadedFiles: images }, () =>
        this.props.imageHandler(images)
      );
    });
  };

  showUploadedImage = () =>
    this.state.uploadedFiles.map(file => (
      <div className="dropzone_box" key={file.public_id}>
        <div
          className="wrap"
          style={{ background: `url(${file.url}) no-repeat` }}
        >
          <div
            className="remove"
            onClick={() => this.onRemoveHandler(file.public_id)}
          >
            Remove
          </div>
        </div>
      </div>
    ));

  render() {
    return (
      <section>
        <Dropzone
          onDrop={this.onDropHandler}
          className="dropzone_box"
          multiple={false}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="dropzone clear">
              <div {...getRootProps({ className: "dropzone_box" })}>
                <input {...getInputProps()} />
                <div className="wrap">
                  <FontAwesomeIcon icon={faPlusCircle} />
                </div>
              </div>
              {this.showUploadedImage()}
              {this.state.uploading && (
                <div
                  className="dropzone_box"
                  style={{ textAlign: "center", paddingTop: "60px" }}
                >
                  <CircularProgress
                    style={{ color: "#00bcd4" }}
                    thickness={7}
                  />
                </div>
              )}
            </div>
          )}
        </Dropzone>
      </section>
    );
  }
}

export default FileUpload;
