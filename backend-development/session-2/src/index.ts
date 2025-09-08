import express from 'express';
import cookieParser from 'cookie-parser';
import todosRouter from './routers/todos';

const PORT = 8000;

const app = express();

// middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware to parse cookies
app.use(cookieParser());

// app middleware for all routes
app.use((req, res, next) => {
  console.log('API called');
  next();
});

// routes
app.use('/api/todos', todosRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
