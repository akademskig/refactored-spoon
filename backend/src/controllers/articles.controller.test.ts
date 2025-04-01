import { Request, Response } from 'express';
import { getArticles, getLatestArticles } from './articles.controller';
import { fetchNewsApi } from '../utils/fetchNewsApi';
import { getCache, NYT_ARTICLES_CACHE_KEY, setCache } from '../utils/cache';
import { NEWS_API_ARTICLES_CACHE_KEY } from '../utils/cache';
import { Article } from '../types/Article';
import { fetchNYT } from '../utils/fetchNYT';

jest.mock('../utils/fetchNewsApi');
jest.mock('../utils/fetchNYT');
jest.mock('../utils/cache');

describe('getLatestArticles', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    req = { query: {} };
    res = { json: jsonMock, status: statusMock };
    jest.clearAllMocks();
  });

  it('should return cached articles if available and forceRefresh is false', async () => {
    const cachedArticles: Partial<Article>[] = [
      { title: 'Cached Article', published_date: '2023-01-01' },
    ];
    (getCache as jest.Mock).mockReturnValue(cachedArticles);

    await getLatestArticles(req as Request, res as Response);

    expect(getCache).toHaveBeenCalledWith(NEWS_API_ARTICLES_CACHE_KEY(1));
    expect(fetchNewsApi).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(cachedArticles);
  });

  it('should fetch and cache articles if no cache is available', async () => {
    const newsApiArticles: Pick<Article,"title" | "published_date">[] = [
      { title: 'News API Article', published_date: '2023-01-02' },
    ];
    (getCache as jest.Mock).mockReturnValue(null);
    (fetchNewsApi as jest.Mock).mockResolvedValue(newsApiArticles);

    await getLatestArticles(req as Request, res as Response);

    expect(fetchNewsApi).toHaveBeenCalledWith({ page: 1 });
    expect(setCache).toHaveBeenCalledWith(
      NEWS_API_ARTICLES_CACHE_KEY(1),
      newsApiArticles.sort(
        (a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime(),
      ),
      300,
    );
    expect(res.json).toHaveBeenCalledWith(
      newsApiArticles.sort(
        (a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime(),
      ),
    );
  });

  it('should fetch articles for the specified page', async () => {
    const page = 2;
    const newsApiArticles: Pick<Article,"title" | "published_date">[]= [
      { title: 'News API Article', published_date: '2023-01-02' },
    ];
    req.query = req.query ?? {};
    req.query.page = page.toString();
    (getCache as jest.Mock).mockReturnValue(null);
    (fetchNewsApi as jest.Mock).mockResolvedValue(newsApiArticles);

    await getLatestArticles(req as Request, res as Response);

    expect(fetchNewsApi).toHaveBeenCalledWith({ page });
    expect(setCache).toHaveBeenCalledWith(
      NEWS_API_ARTICLES_CACHE_KEY(page),
      newsApiArticles.sort(
        (a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime(),
      ),
      300,
    );
    expect(res.json).toHaveBeenCalledWith(
      newsApiArticles.sort(
        (a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime(),
      ),
    );
  });

  it('should force refresh and fetch new articles if forceRefresh is true', async () => {
    const newsApiArticles:Pick<Article,"title" | "published_date">[] = [
      { title: 'News API Article', published_date: '2023-01-02' },
    ];
    req.query = req.query ?? {};
    req.query.forceRefresh = 'true';
    (fetchNewsApi as jest.Mock).mockResolvedValue(newsApiArticles);

    await getLatestArticles(req as Request, res as Response);

    expect(getCache).not.toHaveBeenCalled();
    expect(fetchNewsApi).toHaveBeenCalledWith({ page: 1 });
    expect(setCache).toHaveBeenCalledWith(
      NEWS_API_ARTICLES_CACHE_KEY(1),
      newsApiArticles.sort(
        (a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime(),
      ),
      300,
    );
    expect(res.json).toHaveBeenCalledWith(
      newsApiArticles.sort(
        (a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime(),
      ),
    );
  });

  it('should return a 500 error if an exception occurs', async () => {
    (getCache as jest.Mock).mockImplementation(() => {
      throw new Error('Cache error');
    });

    await getLatestArticles(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Failed to fetch articles' });
  });
});

describe('getArticles', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    req = { query: {} };
    res = { json: jsonMock, status: statusMock };
    jest.clearAllMocks();
  });

  it('should return cached NYT articles if available and forceRefresh is false', async () => {
    const cachedArticles: Partial<Article>[] = [
      { title: 'Cached NYT Article', published_date: '2023-01-01' },
    ];
    (getCache as jest.Mock).mockReturnValue(cachedArticles);

    await getArticles(req as Request, res as Response);

    expect(getCache).toHaveBeenCalledWith(NYT_ARTICLES_CACHE_KEY);
    expect(fetchNYT).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(cachedArticles);
  });

  it('should fetch and cache NYT articles if no cache is available', async () => {
    const nytArticles: Pick<Article, 'title' | 'published_date'>[] = [
      { title: 'NYT Article', published_date: '2023-01-02' },
    ];
    (getCache as jest.Mock).mockReturnValue(null);
    (fetchNYT as jest.Mock).mockResolvedValue(nytArticles);

    await getArticles(req as Request, res as Response);

    expect(fetchNYT).toHaveBeenCalled();
    expect(setCache).toHaveBeenCalledWith(
      NYT_ARTICLES_CACHE_KEY,
      nytArticles.sort(
        (a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime(),
      ),
      300,
    );
    expect(res.json).toHaveBeenCalledWith(
      nytArticles.sort(
        (a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime(),
      ),
    );
  });

  it('should force refresh and fetch new NYT articles if forceRefresh is true', async () => {
    const nytArticles: Pick<Article, 'title' | 'published_date'>[] = [
      { title: 'NYT Article', published_date: '2023-01-02' },
    ];
    req.query = req.query ?? {};
    req.query.forceRefresh = 'true';
    (fetchNYT as jest.Mock).mockResolvedValue(nytArticles);

    await getArticles(req as Request, res as Response);

    expect(getCache).not.toHaveBeenCalled();
    expect(fetchNYT).toHaveBeenCalled();
    expect(setCache).toHaveBeenCalledWith(
      NYT_ARTICLES_CACHE_KEY,
      nytArticles.sort(
        (a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime(),
      ),
      300,
    );
    expect(res.json).toHaveBeenCalledWith(
      nytArticles.sort(
        (a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime(),
      ),
    );
  });

  it('should return a 500 error if an exception occurs', async () => {
    (getCache as jest.Mock).mockImplementation(() => {
      throw new Error('Cache error');
    });

    await getArticles(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Failed to fetch articles' });
  });
});