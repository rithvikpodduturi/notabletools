
import { Router } from 'express';
import { authenticateApiKey } from '../middleware/auth';

const router = Router();

// Public endpoints
router.get('/', async (req, res) => {
  // In a real app, this would fetch from a database
  const products = [
    { id: '1', name: 'Product 1', tagline: 'Amazing product', upvotes: 120 },
    { id: '2', name: 'Product 2', tagline: 'Revolutionary tool', upvotes: 85 },
  ];
  
  res.json({ products });
});

router.get('/:id', async (req, res) => {
  // In a real app, this would fetch from a database
  const product = { 
    id: req.params.id, 
    name: `Product ${req.params.id}`, 
    tagline: 'Amazing product', 
    upvotes: 120,
    description: 'Detailed product description',
    launchDate: new Date().toISOString(),
    makers: [
      { id: '1', name: 'John Doe', avatar: 'https://ui-avatars.com/api/?name=John+Doe' }
    ]
  };
  
  res.json({ product });
});

// Protected endpoints
router.post('/', authenticateApiKey, async (req, res) => {
  res.status(201).json({ 
    message: 'Product created',
    product: { id: '3', ...req.body } 
  });
});

router.put('/:id', authenticateApiKey, async (req, res) => {
  res.json({ 
    message: 'Product updated',
    product: { id: req.params.id, ...req.body } 
  });
});

export default router;
