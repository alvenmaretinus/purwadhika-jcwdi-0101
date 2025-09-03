import express from 'express';
import cors from 'cors';

const PORT = 8000;
const app = express();

// middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable cross site requests
app.use(cors());

/**
 * API Root Route
 * GET /api - Basic API endpoint
 */
app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Hello from /api endpoint' });
});

/**
 * API Articles Route
 * GET /api/articles - Get list of articles
 */
app.get('/api/articles', (req, res) => {
  res.status(200).json({ data: { articles: ['Article 1', 'Article 2', 'Article 3'] } });
});

/**
 * API Users Route
 * GET /api/users - Get list of users
 * GET /api/users/:id - Get user by ID
 * POST /api/users - Create a new user
 * PATCH /api/users/:id - Update user by ID
 * DELETE /api/users - Delete a user
 */

app.get('/api/users', (req, res) => {
  res.status(200).json({
    data: {
      users: [
        { id: Math.floor(Math.random() * 1000000) + 1, name: 'Charlie', age: 27 },
        { id: Math.floor(Math.random() * 1000000) + 1, name: 'Andy', age: 29 },
      ],
    },
  });
});

app.get('/api/users/:id', (req, res) => {
  // get from request params
  const { id }: any = req.params;

  // logic to get user from database (mocked here)

  // respond with the created user
  res.status(200).json({
    data: {
      user: { id, name: 'Charlie', age: 27 },
    },
  });
});

app.post('/api/users', (req, res) => {
  // get from request body
  const { user } = req.body;

  // logic to save user to database (mocked here)

  // respond with the created user
  res.status(200).json({
    success: true,
    data: {
      user: { id: Math.floor(Math.random() * 1000000) + 1, name: user.name, age: user.age },
    },
  });
});

app.patch('/api/users/:id', (req, res) => {
  // get from request params
  const { id }: any = req.params;
  const { user } = req.body;

  // logic to update user in database (mocked here)

  // respond with the updated user
  res.status(200).json({
    success: true,
    data: {
      user: { id, name: user.name, age: user.age },
    },
  });
});

app.delete('/api/users', (req, res) => {
  // can use try catch for error handling
  try {
    const { user } = req.body;

    // logic to delete user from database (mocked here)

    // respond with the deleted user
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: { message: 'Internal Server Error' } });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
