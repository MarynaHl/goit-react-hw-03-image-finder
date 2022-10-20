import React, { Component } from "react";

import s from "./Searchbar.module.css";

class Searchbar extends Component {
  state = {
    requestedImages: "",
  };

  handleInputValue = (e) => {
    const { value } = e.target;

    this.setState({ requestedImages: value });
  };

  handleFetchImages = (e) => {
    e.preventDefault();

    const { requestedImages } = this.state;
    const { fetchImages, resetImagesArray } = this.props;

    resetImagesArray();

    const resetedPageNumber = 1;

    fetchImages(requestedImages, resetedPageNumber);

    this.setState({ requestedImages: "" });
  };

  render() {
    const { state, handleInputValue, handleFetchImages } = this;
    const { requestedImages } = state;

    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={handleFetchImages}>
          <button type="submit" className={s.searchForm__button}>
            <span className={s.searchForm__buttonLabel}>Search</span>
          </button>

          <input
            className={s.searchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={requestedImages}
            onChange={handleInputValue}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
