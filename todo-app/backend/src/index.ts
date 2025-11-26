import express from 'express';
import { redis } from './lib/redis';

const PORT = process.env.BACKEND_PORT;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Test Redis endpoint
app.get('/api/redis-test', async (req, res) => {
  try {
    await redis.set('test-key', 'Hello from Redis!');
    const value = await redis.get('test-key');
    res.json({ success: true, value });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
