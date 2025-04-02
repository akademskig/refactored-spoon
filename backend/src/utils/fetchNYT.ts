import axios from 'axios';
import { Article } from '../types/Article';
import config from '../config';

// Constants
const DEFAULT_CATEGORY = 'General';
const DEFAULT_AUTHOR = 'New York Times';
const IMAGE_FORMAT = 'threeByTwoSmallAt2X';
const NYT_API_URL = 'https://api.nytimes.com/svc/topstories/v2/home.json';

// Utility Functions
const getDefaultImageUrl = (seed: string): string =>
  `https://picsum.photos/seed/nyt${seed}/400/200`;

const formatAuthor = (byline: string | undefined): string =>
  byline?.replace(/^By\s+/i, '') || DEFAULT_AUTHOR;

const mapArticle = (article: any): Article => {
  const multimedia = article.multimedia?.find((m: any) => m.format === IMAGE_FORMAT);
  return {
    id: `nyt_${article.url}`,
    url: article.url,
    title: article.title,
    abstract: article.abstract,
    published_date: article.published_date,
    category: article.section || DEFAULT_CATEGORY,
    image: multimedia?.url || getDefaultImageUrl(Math.random().toString()),
    author: formatAuthor(article.byline),
  };
};

export const fetchNYT = async (): Promise<Article[]> => {
  try {
    const res = await axios.get(`${NYT_API_URL}?api-key=${config.NYT_API_KEY}`);
    return res.data.results.map(mapArticle);
  } catch (error) {
    console.error('Error fetching NYT articles:', error);
    throw new Error('Failed to fetch NYT articles');
  }
};
