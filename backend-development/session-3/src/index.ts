import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import expensesRouter from './routers/expenses';
import jsonParseErrorMiddleware from './middlewares/json';
import errorMiddleware from './middlewares/error';

const PORT = 8000;

const app = express();

// middleware to parse JSON and urlencoded data
app.use(express.json({ strict: true }));
app.use(express.urlencoded({ extended: true }));
app.use(jsonParseErrorMiddleware);

// middleware to parse cookies
app.use(cookieParser());

/**
 * All expenses api routes
 * `/api/expenses` routes
 */
app.use('/api/expenses', expensesRouter);

/**
 * middleware for general error handling
 */
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
