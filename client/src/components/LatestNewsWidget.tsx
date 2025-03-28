import styles from '../styles/latestNewsWidget.module.scss';

const LatestNewsWidget = () => {
  const latest = [
    { time: '14:30', title: 'How To Write Better Advertising Copy' },
    { time: '14:30', title: '6 Powerful Tips To Create Testimonials...' },
    // ...
  ];

  return (
    <div className={styles.root}>
      <h3>
        <span className={styles.dot} /> Latest news
      </h3>
      <ul>
        {latest.map((n, i) => (
          <li key={i}>
            <span>{n.time}</span>
            <p>{n.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestNewsWidget;
