import { Request, Response, NextFunction } from 'express';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  if (
    err instanceof SyntaxError &&
    typeof (err as any).type === 'string' &&
    (err as any).type === 'entity.parse.failed'
  ) {
    return res.status(400).json({ error: 'Invalid JSON format provided to the API.' });
  }

  next();
}
