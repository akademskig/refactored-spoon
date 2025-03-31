import styles from './EmptyList.module.scss';

type Props = {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
};

const EmptyList = ({ title = 'Nothing here yet', subtitle = '', icon }: Props) => {
  return (
    <div className={styles.empty}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
};

export default EmptyList;
