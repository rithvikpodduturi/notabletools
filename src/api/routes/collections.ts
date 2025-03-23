
import { Router } from 'express';
import { authenticateApiKey } from '../middleware/auth';

const router = Router();

router.get('/', async (req, res) => {
  // In a real app, this would fetch from a database
  const collections = [
    { id: '1', name: 'Top AI Tools', description: 'Best AI tools of 2023', productCount: 12 },
    { id: '2', name: 'Design Resources', description: 'Essential design resources', productCount: 8 },
  ];
  
  res.json({ collections });
});

router.get('/:id', async (req, res) => {
  // In a real app, this would fetch from a database
  const collection = { 
    id: req.params.id, 
    name: `Collection ${req.params.id}`, 
    description: 'Collection description',
    products: [
      { id: '1', name: 'Product 1', tagline: 'Amazing product', upvotes: 120 },
      { id: '2', name: 'Product 2', tagline: 'Revolutionary tool', upvotes: 85 },
    ]
  };
  
  res.json({ collection });
});

router.post('/', authenticateApiKey, async (req, res) => {
  res.status(201).json({ 
    message: 'Collection created',
    collection: { id: '3', ...req.body } 
  });
});

export default router;
