import { Router } from 'express';
import * as auth from '../controllers/auth.controller';
import * as articles from '../controllers/articles.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

router.post('/signup', auth.signup);
router.post('/signin', auth.signin);
router.get('/verify/:token', auth.verifyEmail);
router.post('/logout', auth.logout);

router.get('/articles', articles.getArticles);
router.use(authMiddleware);

export default router;
