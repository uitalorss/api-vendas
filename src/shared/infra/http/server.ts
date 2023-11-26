import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { router } from './routes';
import { AppError } from '@shared/errors/AppError';
import { errors } from 'celebrate';
import { rateLimiter } from './middlewares/rateLimiter';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(express.json());
app.use(cors());
app.use(rateLimiter);
app.use(router);
app.use('/files', express.static('./uploads'));
app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  console.log(error);
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3000);
