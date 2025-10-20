import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { AppError } from '../errors/AppError';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`[Error] ${err.name} ${err.message}`);
  if (err.stack) console.log(err.stack);

  // Prisma error handling
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(400).json({ message: err.message, code: err.code });
  }

  // AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Unknown Error
  return res.status(500).json({
    message: 'Internal server error',
    detail: err.message || 'Something went wrong',
  });
};
