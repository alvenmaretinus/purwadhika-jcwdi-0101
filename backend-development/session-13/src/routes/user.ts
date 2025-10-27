import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    return res.status(200).json({
      message: 'OK',
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'OK',
      users: JSON.stringify(error),
    });
  }
});

export default router;
