import { Article } from "../types/Article";

type Props = {
  article: Article;
  // onBookmark: (id: string) => void;
  // isBookmarked: boolean;
};

export default function ArticleCard({ article }: Props) {
  return (
    <div className="article-card">
      <h3>{article.title}</h3>
      <p>{article.abstract}</p>
      <small>{new Date(article.published_date).toLocaleString()}</small>
      {/* <button onClick={() => onBookmark(article.id)}>
        {isBookmarked ? 'Unbookmark' : 'Bookmark'}
      </button> */}
    </div>
  );
}
