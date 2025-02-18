import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwtConfig.js';

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.admin = decoded; // Store admin info in request object
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};
