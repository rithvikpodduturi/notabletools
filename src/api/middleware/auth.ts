
import { Request, Response, NextFunction } from 'express';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticateApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers['x-api-key'] as string;

  if (!apiKey) {
    return res.status(401).json({ error: 'API key is required' });
  }

  // In a real app, this would validate the API key against a database
  // and retrieve the associated user/developer
  if (apiKey.startsWith('ph_')) {
    req.user = { id: '1', name: 'API User' };
    next();
  } else {
    res.status(401).json({ error: 'Invalid API key' });
  }
};

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication token is required' });
  }

  // In a real app, this would validate the JWT token
  if (token === 'sample-jwt-token') {
    req.user = { id: '1', name: 'Test User' };
    next();
  } else {
    res.status(401).json({ error: 'Invalid token' });
  }
};
