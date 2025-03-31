import { useCallback, useEffect, useState, useMemo } from 'react';
import api from '../services/api';
import { Article } from '../types/Article';
import ArticleCard from '../components/ArticleCard';
import { useOutletContext } from 'react-router-dom';
import { OutletContext } from './Home';
import EmptyList from './EmptyList';
import { Bookmark } from 'lucide-react';
import Loader from '../components/Loader';

const Favorites = () => {
  const { toggleBookmark, searchQuery } = useOutletContext<OutletContext>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch bookmarked articles
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/bookmarks/articles');
      setArticles(res.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter articles based on the search query
  const filteredArticles = useMemo(() => {
    return articles.filter((article) =>
      searchQuery ? article.title.toLowerCase().includes(searchQuery.toLowerCase()) : true,
    );
  }, [articles, searchQuery]);

  // Handle toggling bookmarks
  const handleToggleBookmark = useCallback(
    async (article: Article) => {
      await toggleBookmark(article);
      fetchArticles(); // Refresh the list after toggling
    },
    [fetchArticles, toggleBookmark],
  );

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return loading ? (
    <Loader />
  ) : filteredArticles.length ? (
    filteredArticles.map((article) => (
      <ArticleCard
        key={`favorites_${article.id}`}
        article={article}
        isBookmarked={true}
        toggleBookmark={handleToggleBookmark}
      />
    ))
  ) : (
    <EmptyList
      title="No Bookmarks"
      subtitle="Articles you bookmark will show up here."
      icon={<Bookmark size={50} />}
    />
  );
};

export default Favorites;
