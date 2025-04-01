import axios from 'axios';
import { Article } from '../types/Article';

// Constants
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const DEFAULT_CATEGORY = 'General';
const DEFAULT_AUTHOR = 'Unknown author';
const getDefaultImageUrl = (seed: string) => `https://picsum.photos/seed/newsapi${seed}/400/200`;

// Utility Functions
const mapArticle = (article: any, i: number): Article => ({
  id: `newsapi_${i}_${article.publishedAt}`,
  url: article.url,
  title: article.title,
  abstract: article.description,
  published_date: article.publishedAt,
  category: article.source?.name || DEFAULT_CATEGORY,
  image: article.urlToImage || getDefaultImageUrl(i.toString()),
  author: article.author || article.source?.name || DEFAULT_AUTHOR,
});

// Main Function
export const fetchNewsApiArticles = async ({ page }: { page: number }): Promise<Article[]> => {
  const NEWS_API_KEY = process.env.NEWS_API_KEY;

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
