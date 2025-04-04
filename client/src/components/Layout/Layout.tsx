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

export type OutletContext = {
  loading: boolean;
  articles: Article[];
  bookmarkedArticles: Article[];
  searchQuery: string;
  bookmarks: Map<string, Bookmark>;
  toggleBookmark: (article: Article) => void;
  fetchBookmarkedArticles: () => void;
};

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
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
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

  // Fetch bookmarked articles
  const fetchBookmarkedArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/bookmarks/articles');
      setBookmarkedArticles(res.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
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

  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    try {
      if (user) {
        await fetchBookmarks();
      }
      await fetchArticles();
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchArticles, fetchBookmarks, user]);

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
    fetchInitialData();
  }, [fetchInitialData]);

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
            <Outlet
              context={{
                articles,
                searchQuery,
                bookmarks,
                toggleBookmark,
                loading,
                fetchBookmarkedArticles,
                bookmarkedArticles,
              }}
            />
          </main>
          <main className={styles.mobileMainContent}>
            <ArticleTabs
              latest={<LatestNewsWidget mobile />}
              featured={
                <Outlet
                  context={{
                    loading,
                    articles,
                    searchQuery,
                    bookmarks,
                    toggleBookmark,
                    fetchBookmarkedArticles,
                    bookmarkedArticles,
                  }}
                />
              }
            />
          </main>
          <Toast />
        </div>
      </div>
    </>
  );
};

export default Layout;
