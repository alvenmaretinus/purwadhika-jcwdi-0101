import express from 'express';
import pool from './config/db';

const PORT = 8000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from / endpoint' });
});

console.log('Trying to connect to db...');
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }

  console.log('Connected to the database');

  release();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
