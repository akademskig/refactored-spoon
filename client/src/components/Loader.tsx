import styles from '../styles/Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loader;
