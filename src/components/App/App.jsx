import React, { Component } from "react";
import axios from "axios";

import Loader from "react-loader-spinner";
import Notiflix from "notiflix";

import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

import s from "./App.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class App extends Component {
  state = {
    images: [],
    currentImage: {},
    pageNumber: 0,
    queryString: "",
    isLoaded: true,
    isModalOpened: false,
    isButtonVisible: false,
  };

  componentDidUpdate(prevProp, prevState) {
    const { images } = this.state;

    if (images.length > 12)
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
  }

  fetchImages = (requestedImages, updatedPageNumber) => {
    this.setState({ isButtonVisible: false });

    const apiKey = "22716086-2fdd68696acd66b897a29f84e";
    const url = `https://pixabay.com/api/?q=${requestedImages}&page=${updatedPageNumber}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

    if (requestedImages) {
      this.setState({ isLoaded: false, pageNumber: updatedPageNumber });

      axios
        .get(url)
        .then(({ data }) =>
          this.setState(({ queryString, images }) => {
            const imagesArray = data.hits;

            const sameRequest = requestedImages === queryString;

            let updatedImagesArray = [];

            if (sameRequest) {
              updatedImagesArray = images.concat(imagesArray);
            } else {
              updatedImagesArray = imagesArray;
            }

            return {
              images: updatedImagesArray,
              queryString: requestedImages,
              isLoaded: true,
              isButtonVisible: true,
            };
          })
        )
        .catch((error) => Notiflix.Notify.failure(error.message));
    }
  };

  loadMoreImages = (updatedPageNumber) => {
    const { queryString } = this.state;

    this.fetchImages(queryString, updatedPageNumber);
  };

  handleOpenModal = (imageId) => {
    const { images } = this.state;

    const currentImage = images.find(({ id }) => id === imageId);

    this.setState({ currentImage, isModalOpened: true });

    window.addEventListener("keydown", this.escClickListener);
  };

  escClickListener = (e) => {
    if (e.key === "Escape") {
      this.handleCLoseModal();
    }
  };

  handleCLoseModal = () => {
    this.setState({ currentImage: {}, isModalOpened: false });

    window.removeEventListener("keydown", this.escClickListener);
  };

  resetImagesArray = () => {
    this.setState({ images: [] });
  };

  render() {
    const {
      fetchImages,
      loadMoreImages,
      handleOpenModal,
      handleCLoseModal,
      resetImagesArray,
      state,
    } = this;
    const {
      images,
      pageNumber,
      isLoaded,
      isModalOpened,
      currentImage,
      queryString,
      isButtonVisible,
    } = state;
    const { largeImageURL, tags } = currentImage;

    return (
      <div className={s.mainContainer}>
        <Searchbar
          fetchImages={fetchImages}
          queryString={queryString}
          resetImagesArray={resetImagesArray}
        />

        <Loader
          type="TailSpin"
          color="#00BFFF"
          height={80}
          width={80}
          visible={!isLoaded}
        />

        {isLoaded && (
          <ImageGallery images={images} handleOpenModal={handleOpenModal} />
        )}

        {isButtonVisible && (
          <Button loadMoreImages={loadMoreImages} pageNumber={pageNumber} />
        )}

        {isModalOpened && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            handleCLoseModal={handleCLoseModal}
          />
        )}
      </div>
    );
  }
}

export default App;
