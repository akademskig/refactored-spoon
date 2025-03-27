import { Request, Response } from 'express';
import { fetchNewsApiArticles } from '../utils/fetchNewsApi';
import { fetchNYTArticles } from '../utils/fetchNYT';

export const getArticles = async (req: Request, res: Response) => {
  try {
    const [newsApi, nyt] = await Promise.all([fetchNewsApiArticles(), fetchNYTArticles()]);

    const merged = [...newsApi, ...nyt];
    merged.sort(
      (a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime(),
    );

    const { page = 1, q = '' } = req.query;
    const filtered = merged.filter((a) =>
      a.title.toLowerCase().includes((q as string).toLowerCase()),
    );
    const paged = filtered.slice((+page - 1) * 10, +page * 10);

    res.json(paged);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch articles' });
  }
};
