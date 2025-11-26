import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL as string;

export const redis = new Redis(REDIS_URL);

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});
