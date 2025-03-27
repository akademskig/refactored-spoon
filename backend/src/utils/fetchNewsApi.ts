import axios from 'axios';

export const fetchNewsApiArticles = async () => {
  const res = await axios.get('https://newsapi.org/v2/top-headlines', {
    params: {
      country: 'us',
      pageSize: 10,
    },
    headers: {
      'X-Api-Key': process.env.NEWS_API_KEY,
    },
  });

  // Normalize format
  return res.data.articles.map((a: any, i: number) => ({
    id: 'newsapi_' + i + '_' + a.publishedAt,
    title: a.title,
    abstract: a.description,
    published_date: a.publishedAt,
    category: a.source.name || 'General',
  }));
};
