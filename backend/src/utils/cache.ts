type CacheItem<T> = {
  data: T;
  expiry: number;
};

const cache: Record<string, CacheItem<any>> = {};

export const NYT_ARTICLES_CACHE_KEY = 'nyt_articles';
export const NEWS_API_ARTICLES_CACHE_KEY = (page: number) => `nyt_articles_${page}`;

export const setCache = <T>(key: string, data: T, ttlSeconds = 300) => {
  cache[key] = {
    data,
    expiry: Date.now() + ttlSeconds * 1000,
  };
};

export const getCache = <T>(key: string): T | null => {
  const cached = cache[key];
  if (!cached || cached.expiry < Date.now()) {
    delete cache[key];
    return null;
  }
  return cached.data;
};
