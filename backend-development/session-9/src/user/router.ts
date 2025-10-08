import { Router } from 'express';
import { verifyToken, adminGuard } from '../auth/middleware';

const userRouter = Router();

userRouter.use(verifyToken);

userRouter.get('/users/admin', adminGuard, (req, res) => {
  res.status(200).json({
    data: 'all admin users data here',
  });
});

userRouter.get('/users', (req, res) => {
  res.status(200).json({
    data: 'all users data here',
  });
});

export default userRouter;
