import type { NextFunction, Request, Response } from 'express';

export class AppError extends Error {
  statusCode: number;
  errors?: unknown;

  constructor(message: string, statusCode = 400, errors?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      ...(err.errors !== undefined ? { errors: err.errors } : {}),
    });
  }

  console.error(err);
  return res.status(500).json({ message: 'Internal server error' });
}

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ message: 'Not found' });
}
