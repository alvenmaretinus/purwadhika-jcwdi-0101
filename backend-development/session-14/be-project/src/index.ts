import express from 'express';

const PORT = 8000;

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello fsdafalsdfrom / endpoint' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
