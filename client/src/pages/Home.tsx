import { useOutletContext, useParams } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard/ArticleCard';
import { Article } from '../types/Article';
import { HOME } from '../components/Sidebar/sidebarItems';
import { Bookmark } from '../types/Bookmark';
import EmptyList from '../components/EmptyList/EmptyList';
import { Scroll } from 'lucide-react';
import Loader from '../components/Loader/Loader';

export type OutletContext = {
  articles: Article[];
  selectedCategory: string;
  searchQuery: string;
  bookmarks: Map<string, Bookmark>;
  toggleBookmark: (article: Article) => void;
};

const Home = () => {
  const { articles, searchQuery, bookmarks, toggleBookmark } = useOutletContext<OutletContext>();
  const { slug } = useParams();
  const selectedCategory = slug ? decodeURIComponent(slug) : HOME;

  // Filter articles by category and search query
  const getFilteredArticles = () => {
    return articles.filter((article) => {
      const matchesCategory = selectedCategory === HOME || article.category === selectedCategory;
      const matchesSearchQuery = searchQuery
        ? article.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesCategory && matchesSearchQuery;
    });
  };

  const filteredArticles = getFilteredArticles();
  if (!articles.length) return <Loader />;

  return (
    <>
      {filteredArticles.length ? (
        filteredArticles.map((article) => (
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
    </>
  );
};

export default Home;
