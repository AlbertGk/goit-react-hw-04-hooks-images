import styles from '../styles/Button.module.css';

export const Button = ({ pictures, onClick,isLoading }) => {
    return (
      pictures.length > 0 &&
      !isLoading && (
        <button type="button" className={styles.Button} onClick={onClick}>
          Load more
        </button>
      )
    );
};
