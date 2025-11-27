import express from 'express';
import { redis } from './lib/redis';
import { PrismaClient } from '../generated/client';

const prisma = new PrismaClient();

const PORT = process.env.BACKEND_PORT;

const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/todos', async (req, res) => {
  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  res.send({ data: { todos } });
});

app.post('/api/todos', async (req, res) => {
  const { title, description, remindTime } = req.body;

  const newTodo = await prisma.todo.create({
    data: {
      title,
      description,
      remindTime,
      updatedAt: new Date(),
    },
  });

  res.send({ data: { todo: newTodo } });
});

app.patch('/api/todos/:id', async (req, res) => {
  try {
    const { title, description, remindTime, isCompleted } = req.body ?? {};

    if (!title && !description && !remindTime && isCompleted === undefined) {
      return res.status(400).send({
        error:
          'At least one field (title, description, remindTime, isCompleted) must be provided for update.',
      });
    }

    const todo = await prisma.todo.update({
      where: { id: Number(req.params.id) },
      data: {
        title,
        description,
        remindTime,
        isCompleted,
        updatedAt: new Date(),
      },
    });

    res.send({ success: true, data: { todo } });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      error,
    });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  await prisma.todo.delete({
    where: { id: Number(req.params.id) },
  });

  res.send({ success: true });
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
