import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon');
    return res.json(data.results);
  } catch (error) {
    console.log('error fetching pokemons', error);
    return res.status(400).send(error);
  }
});

export default router;
