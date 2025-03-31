import { Article } from '../types/Article';
import styles from '../styles/articleCard.module.scss';
import { BookmarkPlus, BookmarkMinus } from 'lucide-react';
type Props = {
  article: Article;
  toggleBookmark: (article: Article) => void;
  isBookmarked: boolean;
};

const ArticleCard = ({ article, toggleBookmark, isBookmarked }: Props) => {
  const { title, category, image, author } = article;

  return (
    <div className={styles.articleCard}>
      {image && <img src={image} alt={title} className={styles.image} />}
      <div className={styles.content}>
        <p className={styles.category}>{category}</p>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.authorBookmark}>
          <p className={styles.author}>{author}</p>
          <button className={styles.bookmark} onClick={() => toggleBookmark(article)}>
            {isBookmarked ? <BookmarkPlus /> : <BookmarkMinus />}
          </button>
        </span>
      </div>
    </div>
  );
};

export default ArticleCard;
