
import { Router } from 'express';
import { authenticateApiKey } from '../middleware/auth';

const router = Router();

router.get('/product/:productId', async (req, res) => {
  // In a real app, this would fetch from a database
  const comments = [
    { id: '1', content: 'Great product!', userId: '1', username: 'User 1', createdAt: new Date().toISOString() },
    { id: '2', content: 'Love it!', userId: '2', username: 'User 2', createdAt: new Date().toISOString() },
  ];
  
  res.json({ comments });
});

router.post('/', authenticateApiKey, async (req, res) => {
  const { productId, content } = req.body;
  
  res.status(201).json({ 
    message: 'Comment created',
    comment: { 
      id: '3', 
      content, 
      productId,
      userId: '1',
      username: 'Test User',
      createdAt: new Date().toISOString()
    } 
  });
});

export default router;
