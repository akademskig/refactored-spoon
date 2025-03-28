import { useOutletContext } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import { Article } from '../types/Article';
import { ALL_CATEGORIES } from '../constants';

type Context = {
  articles: Article[];
  selectedCategory: string;
};

const Home = () => {
  const { articles, selectedCategory } = useOutletContext<Context>();

  if (!articles.length) return <p>Loading...</p>;

  const filtered = articles.filter((a) =>
    selectedCategory === ALL_CATEGORIES ? a : a.category === selectedCategory,
  );
  return (
    <>
      {filtered.map((a) => (
        <ArticleCard key={a.id} article={a} />
      ))}
    </>
  );
};

export default Home;
