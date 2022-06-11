import styles from '../styles/ImageGalleryItem.module.css'

export const ImageGalleryItem = props => {
  return (
    props.pictures.length > 0 &&
    props.pictures.map(picture => (
      <li
        className={styles.ImageGalleryItem}
        key={picture.id}
        onClick={() => props.onClick(picture.id)}
      >
        <img
          src={picture.webformatURL}
          alt={picture.tags}
          className={styles.ImageGalleryItemImage}
        />
      </li>
    ))
  );
};
