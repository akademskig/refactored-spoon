import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Article } from '../types/Article';
import { ALL_CATEGORIES } from '../constants';

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
    <div className="layout">
      <Sidebar categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
      <main>
        <Outlet context={{ articles, selectedCategory }} />
      </main>
    </div>
  );
};

export default Layout;
