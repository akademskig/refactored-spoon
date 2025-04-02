type CacheItem<T> = {
  data: T;
  expiry: number;
};

const cache: Record<string, CacheItem<any>> = {};

export const NYT_ARTICLES_CACHE_KEY = 'nyt_articles';
export const NEWS_API_ARTICLES_CACHE_KEY = (page: number) => `nyt_articles_${page}`;

/**
 * Sets a value in the cache with a specified time-to-live (TTL).
 *
 * @template T - The type of the data to be cached.
 * @param {string} key - The unique key to identify the cached data.
 * @param {T} data - The data to be stored in the cache.
 * @param {number} [ttlSeconds=300] - The time-to-live for the cached data in seconds. Defaults to 300 seconds (5 minutes).
 */
export const setCache = <T>(key: string, data: T, ttlSeconds = 300) => {
  cache[key] = {
    data,
    expiry: Date.now() + ttlSeconds * 1000,
  };
};

/**
 * Retrieves a cached value by its key.
 * 
 * @template T - The expected type of the cached data.
 * @param {string} key - The key associated with the cached value.
 * @returns {T | null} - The cached data if it exists and has not expired, or `null` if the key does not exist or the cache has expired.
 */
export const getCache = <T>(key: string): T | null => {
  const cached = cache[key];
  if (!cached || cached.expiry < Date.now()) {
    delete cache[key];
    return null;
  }
  return cached.data;
};
