import { PostController } from '../controllers/post.controller';
import { Router } from 'express';

export class PostRouter {
  private router: Router;
  private postController: PostController;

  constructor() {
    this.postController = new PostController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.postController.getAllPosts.bind(this.postController));
  }

  getRouter(): Router {
    return this.router;
  }
}
