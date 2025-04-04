import { useCallback, useEffect, useMemo } from 'react';
import { Article } from '../../types/Article';
import { useOutletContext, useParams } from 'react-router-dom';
import ArticleList from '../../components/ArticleList/ArticleList';
import { FAVORITES } from '../../components/Sidebar/sidebarItems';
import { OutletContext } from '../../components/Layout/Layout';

const Favorites = () => {
  const {
    loading,
    toggleBookmark,
    searchQuery,
    bookmarks,
    fetchBookmarkedArticles,
    bookmarkedArticles,
  } = useOutletContext<OutletContext>();
  const { slug } = useParams();
  const selectedCategory = slug ? decodeURIComponent(slug) : FAVORITES;

  // Filter articles based on the search query
  const filteredArticles = useMemo(() => {
    return bookmarkedArticles.filter((article) =>
      searchQuery ? article.title.toLowerCase().includes(searchQuery.toLowerCase()) : true,
    );
  }, [bookmarkedArticles, searchQuery]);

  // Handle toggling bookmarks
  const handleToggleBookmark = useCallback(
    async (article: Article) => {
      await toggleBookmark(article);
      fetchBookmarkedArticles(); // Refresh the list after toggling
    },
    [fetchBookmarkedArticles, toggleBookmark],
  );

  useEffect(() => {
    fetchBookmarkedArticles();
  }, [fetchBookmarkedArticles]);

  return (
    <ArticleList
      loading={loading}
      articles={filteredArticles}
      toggleBookmark={handleToggleBookmark}
      selectedCategory={selectedCategory}
      bookmarks={bookmarks}
    />
  );
};

export default Favorites;
