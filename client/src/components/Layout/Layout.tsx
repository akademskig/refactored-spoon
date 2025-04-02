import { Outlet } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import styles from './Layout.module.scss';
import { Article } from '../../types/Article';
import { Bookmark } from '../../types/Bookmark';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import TopBanner from '../TopBanner/TopBanner';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import LatestNewsWidget from '../LatestNewsWidget/LatestNewsWidget';
import Toast from '../Toast/Toast';
import ArticleTabs from '../ArticleTabs/ArticleTabs';

// Utility function to get unique categories
const getUniqueCategories = (articles: Article[]): string[] => {
  return Array.from(new Set(articles.map((article) => article.category)));
};

// Utility function to map bookmarks
const mapBookmarks = (bookmarks: Bookmark[]): Map<string, Bookmark> => {
  return new Map(bookmarks.map((b) => [b.article.url, b]));
};

const Layout = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<Map<string, Bookmark>>(new Map());
  const { user } = useAuth();

  // Fetch articles and categories
  const fetchArticles = useCallback(async () => {
    try {
      const res = await api.get('/articles');
      const fetchedArticles = res.data;
      setArticles(fetchedArticles);
      setCategories(getUniqueCategories(fetchedArticles));
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }, []);

  const fetchBookmarks = useCallback(async () => {
    try {
      const res = await api.get('/bookmarks');
      setBookmarks(mapBookmarks(res.data));
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  }, []);

  const toggleBookmark = useCallback(
    async (article: Article) => {
      try {
        await api.post('/bookmark', article);
        fetchBookmarks(); // Re-fetch the updated list
      } catch (error) {
        console.error('Error toggling bookmark:', error);
      }
    },
    [fetchBookmarks],
  );

  useEffect(() => {
    if (user) {
      fetchBookmarks();
    }
    fetchArticles();
  }, [fetchArticles, fetchBookmarks, user]);

  return (
    <>
      <TopBanner />
      <div className={styles.container} data-testid="layout-container">
        <Header
          onSearch={setSearchQuery}
          clearBookmarks={() => setBookmarks(new Map())}
          categories={categories}
        />
        <div className={styles.layout}>
          <Sidebar categories={categories} />
          <main className={styles.mainContent}>
            <Outlet context={{ articles, searchQuery, bookmarks, toggleBookmark }} />
            <LatestNewsWidget />
          </main>
          <main className={styles.mobileMainContent}>
            <ArticleTabs
              latest={<LatestNewsWidget mobile />}
              featured={<Outlet context={{ articles, searchQuery, bookmarks, toggleBookmark }} />}
            />
          </main>
          <Toast />
        </div>
      </div>
    </>
  );
};

export default Layout;
