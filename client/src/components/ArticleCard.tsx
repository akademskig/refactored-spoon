import { Article } from '../types/Article';
import styles from '../styles/articleCard.module.scss';
type Props = {
  article: Article;
  // onBookmark: (id: string) => void;
  // isBookmarked: boolean;
};

const ArticleCard = ({ article }: Props) => {
  const { title, category, image, author } = article;
  return (
    <div className={styles.articleCard}>
      {image && <img src={image} alt={title} className={styles.image} />}
      <div className={styles.content}>
        <p className={styles.category}>{category}</p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.author}>{author}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
