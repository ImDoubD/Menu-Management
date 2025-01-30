import { Request, Response } from 'express';
import authService from '../service/authService';

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await authService.register(email, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json(result);
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
    }
  }
}

export default new AuthController();