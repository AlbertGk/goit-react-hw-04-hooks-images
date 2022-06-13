import { useState } from 'react';
import styles from 'styles/App.module.css';

import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { finderInstance } from 'api/client';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { Loader } from 'components/Loader';


export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [bigPicture, setBigPicture] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  const [lookingValue, setLookingValue] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = event => {
    event.preventDefault();
    setLookingValue(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    // console.log(this.state.lookingValue);
    try {
      const response = await finderInstance.get(
        `?q=${lookingValue}&page=${page}&key=26513861-7ba7a860ef1b492cf85cf7d68&&image_type=photo&orientation=horizontal&per_page=12`
      );
      console.log(response);
      setPictures(response.data.hits);
      setPage(2);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async event => {
    event.preventDefault();

    setIsLoading(true);
    console.log(page);
    try {
      const response = await finderInstance.get(
        `?q=${lookingValue}&page=${page}&key=26513861-7ba7a860ef1b492cf85cf7d68&&image_type=photo&orientation=horizontal&per_page=12`
      );
      setPictures(prevState => [...prevState, ...response.data.hits]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
    // setPage(prevState => {
    //   prevState + 1
    // });
    setPage(page + 1);
  };

  const handleModalOpenClose = id => {
    if (isModalOpen) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }

    const uniqueBigPicture = pictures.find(picture => picture.id === id);
    setBigPicture(uniqueBigPicture);
    console.log(bigPicture);
  };

  const handleModalCloseByKey = event => {
    console.log(event.code);
    if (event.key === 'Escape' && isModalOpen) {
      setIsModalOpen(false);
      console.log(event.code);
    }
  };

  return (
    <div className={styles.App} onKeyDown={handleModalCloseByKey} tabIndex="-1">
      <Searchbar
        onSubmit={handleSubmit}
        onChange={handleChange}
        value={lookingValue}
      />

      <ImageGallery>
        <ImageGalleryItem pictures={pictures} onClick={handleModalOpenClose} />
      </ImageGallery>
      {isLoading && <Loader type="spin" color="#3f51b5" />}
      <Button
        pictures={pictures}
        onClick={handleLoadMore}
        isLoading={isLoading}
      />
      <Modal
        isModalOpen={isModalOpen}
        bigPicture={bigPicture}
        onClick={handleModalOpenClose}
      />
    </div>
  );
}
