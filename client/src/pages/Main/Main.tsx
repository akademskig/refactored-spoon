import { useOutletContext, useParams } from 'react-router-dom';
import { HOME } from '../../components/Sidebar/sidebarItems';
import Loader from '../../components/Loader/Loader';
import ArticleList from '../../components/ArticleList/ArticleList';
import { OutletContext } from '../../components/Layout/Layout';

const Home = () => {
  const { loading, articles, searchQuery, bookmarks, toggleBookmark } =
    useOutletContext<OutletContext>();
  const { slug } = useParams();
  const selectedCategory = slug ? decodeURIComponent(slug) : HOME;

  // Filter articles by category and search query
  const getFilteredArticles = () => {
    return articles.filter((article) => {
      const matchesCategory = selectedCategory === HOME || article.category === selectedCategory;
      const matchesSearchQuery = searchQuery
        ? article.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesCategory && matchesSearchQuery;
    });
  };

  const filteredArticles = getFilteredArticles();
  if (!articles.length) return <Loader />;

  return (
    <ArticleList
      loading={loading}
      articles={filteredArticles}
      selectedCategory={selectedCategory}
      bookmarks={bookmarks}
      toggleBookmark={toggleBookmark}
    />
  );
};

export default Home;
