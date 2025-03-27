import axios from 'axios';

export const fetchNYTArticles = async () => {
  const res = await axios.get(
    `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.NYT_API_KEY}`,
  );

  return res.data.results.map((a: any) => ({
    id: 'nyt_' + a.url,
    title: a.title,
    abstract: a.abstract,
    published_date: a.published_date,
    category: a.section || 'General',
  }));
};
