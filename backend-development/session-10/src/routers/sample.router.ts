import { SampleController } from '../controllers/sample.controller';
import { Router } from 'express';

export class SampleRouter {
  private router: Router;
  private sampleController: SampleController;

  constructor() {
    this.sampleController = new SampleController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.sampleController.getSampleData.bind(this.sampleController));
    this.router.post('/', this.sampleController.createSampleData.bind(this.sampleController));
  }

  getRouter(): Router {
    return this.router;
  }
}
