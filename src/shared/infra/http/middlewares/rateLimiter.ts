import { NextFunction, Request, Response } from 'express';
import { Redis } from 'ioredis';
import 'dotenv/config';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { AppError } from '@shared/errors/AppError';

export async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const redisClient = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS || undefined,
    });

    const limiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'ratelimit',
      points: 1,
      duration: 1,
    });
    await limiter.consume(Number(req.ip));
    return next();
  } catch (err) {
    throw new AppError('Requisições em excesso', 429);
  }
}
