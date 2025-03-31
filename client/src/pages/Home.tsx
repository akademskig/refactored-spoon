import { useOutletContext, useParams } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import { Article } from '../types/Article';
import { ALL_CATEGORIES } from '../constants';
import { Bookmark } from '../types/Bookmark';

type OutletContext = {
  articles: Article[];
  selectedCategory: string;
  searchQuery: string;
  bookmarks: Map<string, Bookmark>;
  toggleBookmark: (article: Article) => void;
};

const Home = () => {
  const { articles, searchQuery, bookmarks, toggleBookmark } = useOutletContext<OutletContext>();
  const { slug } = useParams();
  const selectedCategory = slug ? decodeURIComponent(slug) : ALL_CATEGORIES;

  // Filter articles by category and search query
  const getFilteredArticles = () => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === ALL_CATEGORIES || article.category === selectedCategory;
      const matchesSearchQuery = searchQuery
        ? article.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesCategory && matchesSearchQuery;
    });
  };

  const filteredArticles = getFilteredArticles();
  if (!articles.length) return <p>Loading...</p>;

  return (
    <>
      {filteredArticles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          isBookmarked={!!bookmarks.get(article.url)}
          toggleBookmark={toggleBookmark}
        />
      ))}
    </>
  );
};

export default Home;
