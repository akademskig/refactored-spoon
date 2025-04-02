import axios from 'axios';
import { Article } from '../types/Article';
import config from '../config';

// Constants
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const DEFAULT_CATEGORY = 'General';
const DEFAULT_AUTHOR = 'Unknown author';
const getDefaultImageUrl = (seed: string) => `https://picsum.photos/seed/newsapi${seed}/400/200`;

/**
 * Maps a raw article object from the News API to a standardized `Article` object.
 *
 * @param article - The raw article object retrieved from the News API.
 * @param i - The index of the article in the list, used to generate unique IDs and fallback values.
 * @returns A standardized `Article` object with normalized properties.
 *
 * @remarks
 * - The `id` is generated using a combination of the index, the article's publication date, and a prefix.
 * - If certain fields are missing in the raw article, default values are used:
 *   - `category` defaults to `DEFAULT_CATEGORY` if `article.source?.name` is not available.
 *   - `image` defaults to a value from `getDefaultImageUrl` if `article.urlToImage` is not available.
 *   - `author` defaults to `DEFAULT_AUTHOR` or `article.source?.name` if `article.author` is not available.
 */
interface NewsApiArticle {
  source?: { name?: string };
  author?: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
}

const mapArticle = (article: NewsApiArticle, i: number): Article => ({
  id: `newsapi_${i}_${article.publishedAt}`,
  url: article.url,
  title: article.title,
  abstract: article.description,
  published_date: article.publishedAt,
  category: article.source?.name || DEFAULT_CATEGORY,
  image: article.urlToImage || getDefaultImageUrl(i.toString()),
  author: article.author || article.source?.name || DEFAULT_AUTHOR,
});

/**
 * Fetches articles from the NewsAPI.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {number} params.page - The page number to fetch.
 * @returns {Promise<Article[]>} A promise that resolves to an array of articles.
 * @throws {Error} Throws an error if the API request fails.
 */
export const fetchNewsApi = async ({ page }: { page: number }): Promise<Article[]> => {
  const NEWS_API_KEY = config.NEWS_API_KEY;

  try {
    const res = await axios.get(NEWS_API_URL, {
      params: {
        country: 'us',
        pageSize: 10,
        page,
      },
      headers: {
        'X-Api-Key': NEWS_API_KEY,
      },
    });

    return res.data.articles.map(mapArticle);
  } catch (error) {
    console.error('Error fetching NewsAPI articles:', error);
    throw new Error('Failed to fetch NewsAPI articles');
  }
};
