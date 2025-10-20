import express, { Express, urlencoded, json, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { PostRouter } from './routers/post.router';
import 'dotenv/config';
import { logErrorHandler } from './middlewares/logging';
import pinoHttp from 'pino-http';
import { logger } from './lib/logger';
import { errorHandler } from './middlewares/errorHandler';

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
    this.app.use(pinoHttp({ logger }));
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private middleware() {}

  private routes() {
    const postRouter = new PostRouter();

    this.app.use('/posts', postRouter.getRouter());
  }

  private handleError() {
    this.app.use(errorHandler);
    // this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    //   // log error into a file
    //   logErrorHandler(err.message);

    //   req.log.error(err);

    //   res.status(500).json({
    //     success: false,
    //     error: {
    //       message: err.message,
    //     },
    //   });
    // });
  }

  public start() {
    this.app.listen(PORT, () => {
      console.log(`App started on http://localhost:${PORT}/`);
    });
  }
}
