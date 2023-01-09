import { NextFunction, Request, Response } from 'express';

interface Callback {
  (req: Request, res: Response, next: NextFunction): any;
}

export const catchError = (fn: Callback) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);
