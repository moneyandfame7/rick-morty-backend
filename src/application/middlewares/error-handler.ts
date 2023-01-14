import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../api-error';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(400).send({ error: err.serializeErrors() });
  }

  res.status(500).json({ error: { message: 'Something broke!' } });
};
export default errorHandler;
