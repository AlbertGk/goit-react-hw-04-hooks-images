import styles from '../styles/ImageGallery.module.css';

export const ImageGallery = ({ children }) => {
  return <ul className={styles.ImageGallery}>{children}</ul>;
};
