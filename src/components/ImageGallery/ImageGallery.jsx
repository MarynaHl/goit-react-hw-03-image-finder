import React, { Component } from "react";


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
