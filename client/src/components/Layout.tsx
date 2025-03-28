import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Article } from '../types/Article';
import { ALL_CATEGORIES } from '../constants';
import styles from '../styles/layout.module.scss';
import LatestNewsWidget from './LatestNewsWidget';

const Layout = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORIES);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await api.get('/articles');
      setArticles(res.data);
      const cats: string[] = Array.from(
        new Set(res.data.map((a: Article) => a.category || 'General')),
      );
      setCategories([ALL_CATEGORIES, ...cats]);
    };
    fetchArticles();
  }, []);

  return (
    <div className={styles.layout}>
      {/* <Header /> */}
      <Sidebar categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
      <main className={styles.mainContent}>
        <Outlet context={{ articles, selectedCategory }} />
        <LatestNewsWidget />
      </main>
    </div>
  );
};

export default Layout;
