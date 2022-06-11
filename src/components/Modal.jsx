import styles from '../styles/Modal.module.css';

export const Modal = ({ isModalOpen, bigPicture, onClick }) => {
  return (
    isModalOpen && (
      <div className={styles.Overlay} onClick={onClick} >
        <div className={styles.Modal}>
          <img src={bigPicture.largeImageURL} alt="" />
        </div>
      </div>
    )
  );
};
