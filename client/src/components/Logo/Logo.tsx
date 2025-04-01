import styles from './Logo.module.scss';

type Props = {
  center?: boolean;
  externalStyles?: string;
};
const Logo = ({ center, externalStyles }: Props) => {
  return (
    <div className={`${styles.logo} ${externalStyles} ${center ? styles.center : ''}`}>
      My<span>News</span>
    </div>
  );
};
export default Logo;
