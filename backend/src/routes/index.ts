import { Router } from 'express';
import * as articles from '../controllers/articles.controller';

const router = Router();

router.get('/articles', articles.getArticles);

export default router;
