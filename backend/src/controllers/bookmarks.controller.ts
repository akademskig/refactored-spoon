import { Response, Request } from 'express';
import { Bookmark } from '../db/models/Bookmark';
import { AuthRequest } from '../types/AuthRequest';
import { Article } from '../db/models/Article';

export const toggleBookmark = async (req: Request, res: Response) => {
  const { url, title, author, category, image, published_date } = req.body;
  const { user } = req as AuthRequest;
  const userId = user.id;

  let article = await Article.findOne({ url });
  if (!article) {
    article = await Article.create({ url, title, author, category, image, published_date });
  }

  const existing = await Bookmark.findOne({ user: userId, article: article._id });
  if (existing) {
    await existing.deleteOne();
    res.status(200).json({ msg: 'Bookmark removed' });
    return;
  }
  await Bookmark.create({ user: userId, article: article._id });
  res.status(201).json({ msg: 'Bookmarked' });
};

export const getBookmarkedArticles = async (req: Request, res: Response) => {
  const { user } = req as AuthRequest;
  const bookmarks = await Bookmark.find({ user: user.id })
    .populate('article')
    .sort({ createdAt: -1 });

  const articles = bookmarks.map((b) => b.article);
  res.json(articles);
};
export const getBookMarks = async (req: Request, res: Response) => {
  const { user } = req as AuthRequest;
  const bookmarks = await Bookmark.find({ user: user.id })
    .populate({ path: 'article', select: 'url' })
    .sort({ createdAt: -1 });
  res.json(bookmarks);
};
