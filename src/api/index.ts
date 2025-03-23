
import { Router } from 'express';
import products from './routes/products';
import auth from './routes/auth';
import comments from './routes/comments';
import collections from './routes/collections';
import webhooks from './routes/webhooks';
import apiKeys from './routes/apiKeys';

const router = Router();

// API routes
router.use('/products', products);
router.use('/auth', auth);
router.use('/comments', comments);
router.use('/collections', collections);
router.use('/webhooks', webhooks);
router.use('/api-keys', apiKeys);

export default router;
