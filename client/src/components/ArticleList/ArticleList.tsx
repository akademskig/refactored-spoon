import ArticleCard from '../../components/ArticleCard/ArticleCard';
import { Article } from '../../types/Article';
import { Bookmark } from '../../types/Bookmark';
import EmptyList from '../../components/EmptyList/EmptyList';
import { Scroll } from 'lucide-react';
import Loader from '../../components/Loader/Loader';
import styles from './ArticleList.module.scss';
import LatestNewsWidget from '../../components/LatestNewsWidget/LatestNewsWidget';
import { capitalize } from '../../utils/toUppercase';

type Props = {
  loading: boolean;
  articles: Article[];
  selectedCategory: string;
  bookmarks: Map<string, Bookmark>;
  toggleBookmark: (article: Article) => void;
};
const ArticleList = ({ loading, articles, bookmarks, toggleBookmark, selectedCategory }: Props) => {
  return (
    <>
      <h3 className={styles.title}> {capitalize(selectedCategory)}</h3>
      <div className={styles.container}>
        {loading ? (
          <Loader />
        ) : articles.length ? (
          articles.map((article) => (
            <ArticleCard
              key={`home_${article.id}`}
              article={article}
              isBookmarked={!!bookmarks.get(article.url)}
              toggleBookmark={toggleBookmark}
            />
          ))
        ) : (
          <EmptyList
            title="Nothing here"
            subtitle="No articles match the selected criteria."
            icon={<Scroll size={50} />}
          />
        )}
        <LatestNewsWidget />
      </div>
    </>
  );
};

export default ArticleList;
