import { Router } from 'express';
import * as auth from '../controllers/auth.controller';
import * as articles from '../controllers/articles.controller';
import * as bookmarks from '../controllers/bookmarks.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

router.post('/signup', auth.signup);
router.post('/signin', auth.signin);
router.get('/verify/:token', auth.verifyEmail);
router.post('/logout', auth.logout);

router.get('/articles', articles.getArticles);
router.get('/latest-articles', articles.getLatestArticles);

router.use(authMiddleware);
router.post('/bookmark', bookmarks.toggleBookmark);
router.get('/bookmarks', bookmarks.getBookmarks);
router.get('/bookmarks/articles', bookmarks.getBookmarkedArticles);

export default router;
