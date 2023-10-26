import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { router } from './routes';
import { AppError } from '@shared/errors/AppError';
import { errors } from 'celebrate';
import '@shared/typeorm';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3000);
