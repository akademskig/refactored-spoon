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

      const uniqueCategories: string[] = Array.from(
        new Set(fetchedArticles.map((article: Article) => article.category)),
      );
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }, []);

  const fetchBookmarks = async () => {
    const res = await api.get('/bookmarks');
    const bookmarkMap = new Map<string, Bookmark>(
      res.data.map((b: Bookmark) => [b.article.url, b]),
    );
    setBookmarks(bookmarkMap);
  };

  const toggleBookmark = async (article: Article) => {
    await api.post('/bookmark', article);
    fetchBookmarks(); // re-fetch the updated list
  };
  useEffect(() => {
    if (user) {
      fetchBookmarks();
    }
    fetchArticles();
  }, [fetchArticles, user]);

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
