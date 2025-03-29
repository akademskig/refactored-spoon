import { Outlet } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Banner from './TopBanner';
import LatestNewsWidget from './LatestNewsWidget';
import api from '../services/api';
import { Article } from '../types/Article';
import { ALL_CATEGORIES } from '../constants';
import styles from '../styles/layout.module.scss';

const Layout = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch articles and categories
  const fetchArticles = useCallback(async () => {
    try {
      const res = await api.get('/articles');
      const fetchedArticles = res.data;
      setArticles(fetchedArticles);

      const uniqueCategories: string[] = Array.from(
        new Set(fetchedArticles.map((article: Article) => article.category || 'General'))
      );
      setCategories([ALL_CATEGORIES, ...uniqueCategories]);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return (
    <>
      <Banner />
      <div className={styles.container}>
        <Header onSearch={setSearchQuery} />
        <div className={styles.layout}>
          <Sidebar
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
          <main className={styles.mainContent}>
            <Outlet context={{ articles, selectedCategory, searchQuery }} />
            <LatestNewsWidget />
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
