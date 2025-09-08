import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const userToken = req.cookies['user-token'];

  if (userToken === '12345') {
    next();
  } else {
    res.status(403).json({ error: { message: 'You need to be authenticated for this action' } });
  }
};
