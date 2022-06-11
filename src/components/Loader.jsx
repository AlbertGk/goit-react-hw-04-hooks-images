import styles from '../styles/Loader.module.css';

import ReactLoading from 'react-loading';

export const Loader = ({ type, color }) => (
  <div className={styles.Loader}>
    <ReactLoading type={type} color={color} height={100} width={100} />
  </div>
);
