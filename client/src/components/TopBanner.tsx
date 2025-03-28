import styles from '../styles/topBanner.module.scss';

const TopBanner = () => {
  return (
    <div className={styles.topBanner}>
      <div className={styles.bannerText}>
        <span className={styles.first}>Make MyNews your homepage</span>
        <span>Every day discover what’s trending on the internet!</span>
      </div>
      <div className={styles.ctaButtons}>
        <button className={styles.link}>No, thanks</button>
        <button className={styles.primary}>GET</button>
      </div>
    </div>
  );
};

export default TopBanner;
