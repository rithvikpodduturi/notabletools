
import { Router } from 'express';
import { authenticateApiKey } from '../middleware/auth';

const router = Router();

router.get('/', authenticateApiKey, async (req, res) => {
  // In a real app, this would fetch from a database
  const apiKeys = [
    { id: '1', name: 'Development Key', key: 'ph_dev_123456', createdAt: new Date().toISOString() },
    { id: '2', name: 'Production Key', key: 'ph_prod_654321', createdAt: new Date().toISOString() },
  ];
  
  // Only show truncated keys for security
  const safeApiKeys = apiKeys.map(k => ({
    ...k,
    key: `${k.key.substring(0, 8)}...`
  }));
  
  res.json({ apiKeys: safeApiKeys });
});

router.post('/', authenticateApiKey, async (req, res) => {
  const { name } = req.body;
  
  // In a real app, this would generate a secure random key
  const newKey = `ph_dev_${Math.random().toString(36).substring(2, 10)}`;
  
  res.status(201).json({ 
    message: 'API key created',
    apiKey: { 
      id: '3', 
      name,
      key: newKey,
      createdAt: new Date().toISOString()
    } 
  });
});

router.delete('/:id', authenticateApiKey, async (req, res) => {
  res.json({ 
    message: 'API key deleted',
    apiKeyId: req.params.id
  });
});

export default router;
