import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { router } from './routes';
import { AppError } from '@shared/errors/AppError';

const app = express();

app.use(express.json());
app.use(cors());
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
app.use(router);

app.listen(3000);
