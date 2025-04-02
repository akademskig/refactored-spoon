import { Request, Response } from 'express';
import { toggleBookmark } from './bookmarks.controller';
import { Bookmark } from '../db/models/Bookmark';
import { Article } from '../db/models/Article';
import { AuthRequest } from '../types/AuthRequest';

jest.mock('../db/models/Bookmark');
jest.mock('../db/models/Article');

describe('toggleBookmark', () => {
  let req: Partial<AuthRequest>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    req = { body: {}, user: { id: 'userId123' } };
    res = { status: statusMock, json: jsonMock };
    jest.clearAllMocks();
  });

  it('should create a new bookmark if it does not exist', async () => {
    const mockArticle = { _id: 'articleId123' };
    (Article.findOneAndUpdate as jest.Mock).mockResolvedValue(mockArticle);
    (Bookmark.findOne as jest.Mock).mockResolvedValue(null);
    (Bookmark.create as jest.Mock).mockResolvedValue({});

    req.body = {
      url: 'http://example.com',
      title: 'Example Article',
      author: 'Author Name',
      category: 'Category',
      image: 'http://example.com/image.jpg',
      published_date: '2023-01-01',
    };

    await toggleBookmark(req as Request, res as Response);

    expect(Article.findOneAndUpdate).toHaveBeenCalledWith(
      { url: 'http://example.com' },
      {
        url: 'http://example.com',
        title: 'Example Article',
        author: 'Author Name',
        category: 'Category',
        image: 'http://example.com/image.jpg',
        published_date: '2023-01-01',
      },
      { new: true, upsert: true },
    );
    expect(Bookmark.findOne).toHaveBeenCalledWith({
      user: 'userId123',
      article: 'articleId123',
    });
    expect(Bookmark.create).toHaveBeenCalledWith({
      user: 'userId123',
      article: 'articleId123',
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Bookmarked' });
  });

  it('should remove an existing bookmark if it exists', async () => {
    const mockArticle = { _id: 'articleId123' };
    const mockBookmark = { deleteOne: jest.fn() };
    (Article.findOneAndUpdate as jest.Mock).mockResolvedValue(mockArticle);
    (Bookmark.findOne as jest.Mock).mockResolvedValue(mockBookmark);

    req.body = {
      url: 'http://example.com',
      title: 'Example Article',
      author: 'Author Name',
      category: 'Category',
      image: 'http://example.com/image.jpg',
      published_date: '2023-01-01',
    };

    await toggleBookmark(req as Request, res as Response);

    expect(Article.findOneAndUpdate).toHaveBeenCalledWith(
      { url: 'http://example.com' },
      {
        url: 'http://example.com',
        title: 'Example Article',
        author: 'Author Name',
        category: 'Category',
        image: 'http://example.com/image.jpg',
        published_date: '2023-01-01',
      },
      { new: true, upsert: true },
    );
    expect(Bookmark.findOne).toHaveBeenCalledWith({
      user: 'userId123',
      article: 'articleId123',
    });
    expect(mockBookmark.deleteOne).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Bookmark removed' });
  });

  it('should return a 500 status code if an error occurs', async () => {
    (Article.findOneAndUpdate as jest.Mock).mockImplementation(() => {
      throw new Error('Database error');
    });

    req.body = {
      url: 'http://example.com',
      title: 'Example Article',
      author: 'Author Name',
      category: 'Category',
      image: 'http://example.com/image.jpg',
      published_date: '2023-01-01',
    };

    await toggleBookmark(req as Request, res as Response);

    expect(Article.findOneAndUpdate).toHaveBeenCalledWith(
      { url: 'http://example.com' },
      {
        url: 'http://example.com',
        title: 'Example Article',
        author: 'Author Name',
        category: 'Category',
        image: 'http://example.com/image.jpg',
        published_date: '2023-01-01',
      },
      { new: true, upsert: true },
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Failed to toggle bookmark' });
  });
});
