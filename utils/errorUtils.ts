import { Request, Response, NextFunction } from 'express';

export class HttpException extends Error {
    constructor(public status: number, public message: string) {
      super(message);
    }
}
  
export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HttpException) {
        return res.status(err.status).json({
        error: err.message
        });
    }

    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
        error: 'Validation error',
        details: (err as any).errors.map((e: any) => e.message)
        });
    }

    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
}