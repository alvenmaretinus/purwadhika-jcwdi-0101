import { User } from '../types/user';
import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).send({ error: 'Unauthorized.' });
    }

    const verifiedUser = verify(token, 'supersecretkey');

    if (!verifiedUser) {
      return res.status(401).send({ error: 'Invalid token.' });
    }

    req.user = verifiedUser as User;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Something went wrong.',
      },
    });
  }
};

export const adminGuard = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (req?.user.role !== 'admin') {
      return res.status(401).json({
        error: {
          message: 'Unauthorized for the action.',
        },
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Something went wrong.',
      },
    });
  }
};
