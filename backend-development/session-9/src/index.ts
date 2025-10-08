import { Prisma, PrismaClient } from '@prisma/client';
import express from 'express';
import authRouter from './auth/router';
import userRouter from './user/router';
import 'dotenv/config';

const PORT = 8000;

const app = express();
const prisma = new PrismaClient();

// middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.use(userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
