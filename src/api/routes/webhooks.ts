
import { Router } from 'express';
import { authenticateApiKey } from '../middleware/auth';

const router = Router();

router.get('/', authenticateApiKey, async (req, res) => {
  // In a real app, this would fetch from a database
  const webhooks = [
    { id: '1', name: 'New product launch', url: 'https://example.com/webhook1', events: ['product.created'] },
    { id: '2', name: 'Comment notification', url: 'https://example.com/webhook2', events: ['comment.created'] },
  ];
  
  res.json({ webhooks });
});

router.post('/', authenticateApiKey, async (req, res) => {
  const { name, url, events } = req.body;
  
  res.status(201).json({ 
    message: 'Webhook created',
    webhook: { 
      id: '3', 
      name,
      url,
      events,
      createdAt: new Date().toISOString()
    } 
  });
});

router.delete('/:id', authenticateApiKey, async (req, res) => {
  res.json({ 
    message: 'Webhook deleted',
    webhookId: req.params.id
  });
});

export default router;
