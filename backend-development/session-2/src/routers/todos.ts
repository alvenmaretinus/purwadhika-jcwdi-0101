import Router, { Request, Response, NextFunction } from 'express';
import { ERROR_RESOURCE_NOT_FOUND } from '../constants/errorCodes';

type Todo = { id: number; title: string; isDone: boolean };

let todos: Todo[] = [
  { id: 1, title: 'buy groceries', isDone: false },
  { id: 2, title: 'do laundry', isDone: true },
  { id: 3, title: 'study for exam', isDone: false },
];

const getNextId = () => todos[todos.length - 1].id + 1;

const router = Router();

// middleware for auth
router.use((req, res, next) => {
  const userToken = req.cookies['user-token'];

  if (userToken === '12345') {
    next();
  } else {
    res.status(403).json({ error: { message: 'You need to be authenticated for this action' } });
  }
});

router.get('/', (req, res) => {
  res.status(200).json({
    data: {
      todos,
    },
  });
});

router.get('/:todoId', (req, res) => {
  const { todoId }: { todoId: string } = req.params;

  const todo = todos.find(({ id }) => id === parseInt(todoId)) ?? null;

  res.status(200).json({
    data: {
      todo,
    },
  });
});

router.post('/', (req, res) => {
  const { todo } = req.body;

  const newTodo = {
    id: getNextId(),
    title: todo.title,
    isDone: false,
  };

  todos.push(newTodo);

  res.status(200).json({
    success: true,
    data: newTodo,
  });
});

router.patch('/:todoId', (req, res, next) => {
  const { todoId }: { todoId: string } = req.params;
  const { todo } = req.body;

  const todoToBeUpdated = todos.find(({ id }) => id === parseInt(todoId));

  if (!todoToBeUpdated) {
    const error = new Error(ERROR_RESOURCE_NOT_FOUND);
    next(error);
  }

  const updatedTodo = {
    id: parseInt(todoId),
    title: todo.title ?? todoToBeUpdated?.title,
    isDone: todo.isDone ?? todoToBeUpdated?.isDone,
  };

  todos = todos.reduce<Todo[]>((acc, curr) => {
    if (curr.id === parseInt(todoId)) {
      return [...acc, updatedTodo];
    }
    return [...acc, curr];
  }, []);

  res.status(200).json({
    success: true,
    data: {
      todo: updatedTodo,
    },
  });
});

router.delete('/:todoId', (req, res, next) => {
  const { todoId }: { todoId: string } = req.params;

  const todoToBeDeleted = todos.find(({ id }) => id === parseInt(todoId));

  if (!todoToBeDeleted) {
    const error = new Error(ERROR_RESOURCE_NOT_FOUND);
    next(error);
  }

  todos = todos.filter(({ id }) => id !== parseInt(todoId));

  res.status(200).json({ success: true });
});

// middleware for error handling
router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  switch (err.message) {
    case ERROR_RESOURCE_NOT_FOUND:
      res.status(404).json({ error: { message: 'Resource not found.' } });
      break;
    default:
      res.status(500).json({ error: { message: 'Something went wrong. Try again later.' } });
      break;
  }
});

export default router;
