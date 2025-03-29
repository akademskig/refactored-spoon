import { useEffect, useRef, useState } from 'react';
import api from '../services/api';
import styles from '../styles/latestNewsWidget.module.scss';

type Article = {
  id: string;
  title: string;
  published_date: string;
};

const title = 'Latest news';
const description = 'See all news';

const LatestNewsWidget = () => {
  const [latest, setLatest] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/articles', {
          params: { page },
        });

        if (res.data.length === 0) setHasMore(false);
        else setLatest((prev) => [...prev, ...res.data]);
      } catch (err) {
        console.error('Failed to fetch latest news', err);
      }
    };
    fetch();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <div className={styles.root}>
      <h3>
        <span className={styles.dotOuter}>
          <span className={styles.dotInner} />
        </span>
        {title}
      </h3>
      <ul className={styles.scrollArea}>
        {latest.map((n) => (
          <li key={n.id}>
            <span>
              {new Date(n.published_date).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            <p>{n.title}</p>
          </li>
        ))}
        <div ref={observerRef} className={styles.scrollTrigger} />
      </ul>

      <div className={styles.footer}>
        <a href="#">{description} &rarr;</a>
      </div>
    </div>
  );
};

export default LatestNewsWidget;
