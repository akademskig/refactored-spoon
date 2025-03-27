import { Request, Response } from 'express';
import { fetchNewsApiArticles } from '../utils/fetchNewsApi';
import { fetchNYTArticles } from '../utils/fetchNYT';
import { ARTICLES_CACHE_KEY, getCache, setCache } from '../utils/cache';
import { Article } from '../types/Article';

export const getArticles = async (req: Request, res: Response) => {
  try {
    let articles = getCache<Article[]>(ARTICLES_CACHE_KEY);
    if (!articles) {
      const [newsApi, nyt] = await Promise.all([fetchNewsApiArticles(), fetchNYTArticles()]);
      // lates articles first
      articles = [...newsApi, ...nyt].sort(
        (a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime(),
      );
      setCache(ARTICLES_CACHE_KEY, articles, 300);
    }

    const { page = 1, q = '' } = req.query;
    const filtered = articles.filter((a) =>
      a.title.toLowerCase().includes((q as string).toLowerCase()),
    );
    const paged = filtered.slice((+page - 1) * 10, +page * 10);

    res.json(paged);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch articles' });
  }
};
