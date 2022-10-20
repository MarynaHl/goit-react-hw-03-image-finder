import React, { Component } from "react";

import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

import s from "./ImageGallery.module.css";

class ImageGallery extends Component {
  render() {
    const { images, handleOpenModal } = this.props;

    return (
      <ul className={s.imageGallery}>
        {images.map(({ id, webformatURL, tags }) => (
          <ImageGalleryItem
            key={id}
            id={id}
            webformatURL={webformatURL}
            tags={tags}
            handleOpenModal={handleOpenModal}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
