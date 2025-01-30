import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './utils/jwtUtils'; // Adjust the path as needed

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ error: 'Access denied. No token provided.' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export default authMiddleware;
