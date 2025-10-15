import { SampleController } from '../controllers/sample.controller';
import { Router } from 'express';
import { validateSampleData } from '../middlewares/validation';
import { uploader } from '../middlewares/uploader';

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
    this.router.post(
      '/',
      validateSampleData,
      this.sampleController.createSampleData.bind(this.sampleController)
    );

    // old school way - host the assets in the same place as the server
    this.router.post(
      '/single-upload',
      uploader('diskstorage', 'IMG', 'images').single('file'),
      this.sampleController.addNewImage.bind(this.sampleController)
    );
    this.router.post(
      '/multiple-upload',
      uploader('diskstorage', 'IMG', 'images').array('files'),
      this.sampleController.addNewImages.bind(this.sampleController)
    );

    // recommended way - host the assets in a specialized file storage bucket (AWS bucket, cloudinary, supabase bucket)
    this.router.post(
      '/cloudinary-upload',
      uploader('memorystorage').single('file'),
      this.sampleController.addImageCloudinary.bind(this.sampleController)
    );
    this.router.post(
      '/cloudinary-remove',
      this.sampleController.removeImageCloudinary.bind(this.sampleController)
    );

    this.router.post(
      '/send-email',
      this.sampleController.sendEmail.bind(this.sampleController)
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
