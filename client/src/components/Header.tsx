import styles from '../styles/header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        My<span>News</span>
      </h1>
      <div className={styles.searchWrapper}>
        <input type="text" placeholder="Search news" />
        <button className={styles.searchBtn}>Search</button>
      </div>
    </header>
  );
};

export default Header;
