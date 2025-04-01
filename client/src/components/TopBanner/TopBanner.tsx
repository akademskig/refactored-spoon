import { useCallback, useState } from 'react';
import styles from './TopBanner.module.scss';

const title = 'Make MyNews your homepage';
const description = 'Every day discover what’s trending on the internet!';
const noBtnText = 'No, thanks';
const getBtnText = 'GET';

const TopBanner = () => {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  const handleDismiss = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
    }, 300);
  }, []);

  if (!visible) return null;
  return (
    <div className={`${styles.topBanner} ${closing ? styles.closing : ''}`}>
      <div className={styles.bannerText}>
        <span className={styles.first}>{title}</span>
        <span className={styles.second}>{description}</span>
      </div>
      <div className={styles.buttons}>
        <button className={styles.noBtn} onClick={handleDismiss}>
          {noBtnText}
        </button>
        <button className={styles.getBtn} onClick={handleDismiss}>
          {getBtnText}
        </button>
      </div>
    </div>
  );
};
export default TopBanner;
