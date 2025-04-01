import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './LatestNewsWidget.module.scss';
import api from '../../services/api';

type Article = {
  id: string;
  title: string;
  published_date: string;
};

const title = 'Latest news';
const description = 'See all news';

type Props = {
  mobile?: boolean;
};
const LatestNewsWidget = ({ mobile }: Props) => {
  const [latest, setLatest] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Fetch articles
  const fetchArticles = useCallback(async () => {
    try {
      const res = await api.get('/articles', { params: { page } });
      if (res.data.length === 0) {
        setHasMore(false);
      } else {
        setLatest((prev) => [...prev, ...res.data]);
      }
    } catch (err) {
      console.error('Failed to fetch latest news', err);
    }
  }, [page]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Infinite scrolling logic
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
    <div className={`${styles.root} ${mobile ? styles.mobile : styles.desktop}`}>
      <h3>
        <span className={styles.dotOuter}>
          <span className={styles.dotInner} />
        </span>
        {title}
      </h3>
      <ul className={styles.scrollArea}>
        {latest.map((article, i) => (
          <li key={`${i}_${article.id}`}>
            <span>
              {new Date(article.published_date).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            <p>{article.title}</p>
          </li>
        ))}
        {hasMore && <div ref={observerRef} className={styles.scrollTrigger} />}
      </ul>

      <div className={styles.footer}>
        <a href="#">{description} &rarr;</a>
      </div>
    </div>
  );
};

export default LatestNewsWidget;
