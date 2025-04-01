import { Request, Response } from 'express';
import { fetchNewsApiArticles } from '../utils/fetchNewsApi';
import { fetchNYTArticles } from '../utils/fetchNYT';
import {
  NEWS_API_ARTICLES_CACHE_KEY,
  NYT_ARTICLES_CACHE_KEY,
  getCache,
  setCache,
} from '../utils/cache';
import { Article } from '../types/Article';

export const getArticles = async (req: Request, res: Response) => {
  try {
    const { forceRefresh = 'false' } = req.query;
    const shouldForceRefresh = forceRefresh === 'true';

    let nytArticles = shouldForceRefresh ? null : getCache<Article[]>(NYT_ARTICLES_CACHE_KEY);
    if (!nytArticles) {
      const nytResponse = await fetchNYTArticles();
      nytArticles = nytResponse.sort(
        (a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime(),
      );
      setCache(NYT_ARTICLES_CACHE_KEY, nytArticles, 300);
    }
    res.json(nytArticles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch articles' });
  }
};
export const getLatestArticles = async (req: Request, res: Response) => {
  try {
    const { page = 1, forceRefresh = 'false' } = req.query;
    const shouldForceRefresh = forceRefresh === 'true';

    let newsApiArticles = shouldForceRefresh
      ? null
      : getCache<Article[]>(NEWS_API_ARTICLES_CACHE_KEY(+page));
    if (!newsApiArticles) {
      const newsApiResponse = await fetchNewsApiArticles({ page: +page });
      // lates articles first
      newsApiArticles = newsApiResponse.sort(
        (a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime(),
      );
      setCache(NEWS_API_ARTICLES_CACHE_KEY(+page), newsApiArticles, 300);
      console.log(newsApiArticles);
    }

    res.json(newsApiArticles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch articles' });
  }
};
