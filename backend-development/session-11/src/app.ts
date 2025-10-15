import express, { Express, urlencoded, json, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { SampleRouter } from './routers/sample.router';
import 'dotenv/config';

const PORT = process.env.EXPRESS_PORT;

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.middleware();
    this.routes();
    this.handleError();
  }

  private configure() {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private middleware() {
    
  }

  private routes() {
    const sampleRouter = new SampleRouter();

    this.app.use('/samples', sampleRouter.getRouter());
  }

  private handleError() {
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      res.status(500).json({
        success: false,
        error: {
          message: err.message,
        },
      });
    });
  }

  public start() {
    this.app.listen(PORT, () => {
      console.log(`App started on http://localhost:${PORT}/`);
    });
  }
}
