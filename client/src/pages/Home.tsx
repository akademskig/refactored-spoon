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

  if (selectedCategory === ALL_CATEGORIES) {
    return (
      <section>
        <h2>{selectedCategory}</h2>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </section>
    );
  }

  const filtered = articles.filter((a) => a.category === selectedCategory);
  return (
    <section>
      <h2>{selectedCategory}</h2>
      {filtered.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </section>
  );
};

export default Home;
