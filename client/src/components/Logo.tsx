import styles from '../styles/Logo.module.scss';

type Props = {
  center?: boolean;
};
const Logo = ({ center }: Props) => {
  return (
    <div className={`${styles.logo} ${center ? styles.center : ''}`}>
      My<span>News</span>
    </div>
  );
};
export default Logo;
