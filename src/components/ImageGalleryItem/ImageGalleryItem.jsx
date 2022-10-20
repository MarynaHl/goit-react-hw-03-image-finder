import React, { Component } from "react";

import s from "./ImageGalleryItem.module.css";

class ImageGalleryItem extends Component {
  render() {
    const { id, webformatURL, tags, handleOpenModal } = this.props;

    return (
      <li className={s.imageGalleryItem} onClick={() => handleOpenModal(id)}>
        <img
          className={s.imageGalleryItem__image}
          src={webformatURL}
          alt={tags}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
