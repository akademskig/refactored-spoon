import { Outlet } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Banner from './TopBanner';
import LatestNewsWidget from './LatestNewsWidget';
import api from '../services/api';
import { Article } from '../types/Article';
import styles from '../styles/layout.module.scss';
import { Bookmark } from '../types/Bookmark';
import Toast from './Toast';
import { useAuth } from '../hooks/useAuth';

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
      <Banner />
      <div className={styles.container}>
        <Header onSearch={setSearchQuery} />
        <div className={styles.layout}>
          <Sidebar categories={categories} />
          <main className={styles.mainContent}>
            <Outlet context={{ articles, searchQuery, bookmarks, toggleBookmark }} />
            <LatestNewsWidget />
            <Toast />
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
