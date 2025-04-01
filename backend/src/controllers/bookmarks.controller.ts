import { Response, Request } from 'express';
import { Bookmark } from '../db/models/Bookmark';
import { AuthRequest } from '../types/AuthRequest';
import { Article } from '../db/models/Article';

export const toggleBookmark = async (req: Request, res: Response) => {
  try {
    const { url, title, author, category, image, published_date } = req.body;
    const { user } = req as AuthRequest;
    const userId = user.id;

    // Find or create the article
    const article = await Article.findOneAndUpdate(
      { url },
      { url, title, author, category, image, published_date },
      { new: true, upsert: true },
    );

    // Check if the bookmark already exists
    const existingBookmark = await Bookmark.findOne({ user: userId, article: article._id });
    if (existingBookmark) {
      await existingBookmark.deleteOne();
      res.status(200).json({ msg: 'Bookmark removed' });
      return;
    }

    // Create a new bookmark
    await Bookmark.create({ user: userId, article: article._id });
    res.status(201).json({ msg: 'Bookmarked' });
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    res.status(500).json({ msg: 'Failed to toggle bookmark' });
  }
};

export const getBookmarkedArticles = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthRequest;

    // Fetch bookmarks and populate article details
    const bookmarks = await Bookmark.find({ user: user.id })
      .populate('article')
      .sort({ createdAt: -1 });

    const articles = bookmarks.map((bookmark) => bookmark.article);
    res.json(articles);
  } catch (error) {
    console.error('Error fetching bookmarked articles:', error);
    res.status(500).json({ msg: 'Failed to fetch bookmarked articles' });
  }
};

export const getBookmarks = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthRequest;
    // Fetch bookmarks and only populate the article URL
    const bookmarks = await Bookmark.find({ user: user.id })
      .populate({ path: 'article', select: 'url' })
      .sort({ createdAt: -1 });

    res.json(bookmarks);
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    res.status(500).json({ msg: 'Failed to fetch bookmarks' });
  }
};
