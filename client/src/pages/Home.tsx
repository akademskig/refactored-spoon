import { useOutletContext } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import { Article } from '../types/Article';
import { ALL_CATEGORIES } from '../constants';

type Context = {
  articles: Article[];
  selectedCategory: string;
  searchQuery: string;
};

const Home = () => {
  const { articles, selectedCategory, searchQuery } = useOutletContext<Context>();

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
        <ArticleCard key={article.id} article={article} />
      ))}
    </>
  );
};

export default Home;
