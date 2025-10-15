import { Request, Response, NextFunction } from 'express';
import { SampleService } from '../services/sample.service';

export class SampleController {
  private sampleService: SampleService;

  constructor() {
    this.sampleService = new SampleService();
  }

  async getSampleData(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.query;

      const samples = id
        ? await this.sampleService.getSampleDataById(parseInt((id ?? '') as string))
        : await this.sampleService.getAllSamples();

      return res.status(200).json({
        success: true,
        data: {
          samples,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async createSampleData(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, code } = req.body;

      const newSample = await this.sampleService.createNewSample(name, code);

      return res.status(200).json({
        success: true,
        data: {
          sample: newSample,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
