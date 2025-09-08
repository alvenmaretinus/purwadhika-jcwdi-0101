import { Request, Response, NextFunction } from 'express';

import { ERROR_RESOURCE_NOT_FOUND, ERROR_INCORRECT_INPUT_FORMAT } from '../constants/errorCodes';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  switch (err?.message ?? '') {
    case ERROR_RESOURCE_NOT_FOUND:
      res.status(404).json({ error: { message: 'Resource not found. Please input correct id.' } });
      break;
    case ERROR_INCORRECT_INPUT_FORMAT:
      res.status(400).json({ error: { message: 'Incorrect input format. Refer to the API docs.' } });
      break;
    default:
      res.status(500).json({ error: { message: 'Something went wrong. Try again later.' } });
      break;
  }
}
