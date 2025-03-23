
import { Router } from 'express';
import { authenticateApiKey } from '../middleware/auth';

const router = Router();

router.post('/token', async (req, res) => {
  const { email, password } = req.body;
  
  // In a real app, this would validate credentials against a database
  if (email === 'test@example.com' && password === 'password') {
    res.json({
      token: 'sample-jwt-token',
      user: {
        id: '1',
        name: 'Test User',
        email: 'test@example.com'
      }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

router.get('/me', authenticateApiKey, async (req, res) => {
  // In a real app, this would get the user from the database based on the token
  res.json({
    user: {
      id: '1',
      name: 'Test User',
      email: 'test@example.com'
    }
  });
});

export default router;
