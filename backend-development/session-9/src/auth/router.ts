import { Router } from 'express';
import { register, login } from './controller';

const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  const { user } = req.body;

  const newUser = await register({
    email: user.email,
    name: user.name,
    password: user.password,
  });

  if ('error' in newUser) {
    res.status(409).json({
      success: false,
      error: {
        message:
          typeof newUser.error === 'object' && newUser.error !== null && 'message' in newUser.error
            ? (newUser.error as { message?: string }).message
            : 'Unknown error',
      },
    });
    return;
  }

  res.status(201).json({
    success: true,
    data: {
      user: newUser,
    },
  });
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await login(email, password);

  if (!!user && 'error' in user) {
    res.status(401).json({
      success: false,
      error: {
        message:
          typeof user.error === 'object' && user.error !== null && 'message' in user.error
            ? (user.error as { message?: string }).message
            : 'Unknown error',
      },
    });
    return;
  }

  res.status(201).json({
    success: true,
    data: {
      user: {
        ...user,
        token: undefined,
      },
      token: user.token,
    },
  });
});

export default authRouter;
