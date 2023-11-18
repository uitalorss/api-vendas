import { NextFunction, Request, Response } from 'express';
import redis from 'redis';
import 'dotenv/config';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { request } from 'http';
import { AppError } from '@shared/errors/AppError';

export async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const redisClient = redis.createClient({
      legacyMode: true,
      password: process.env.REDIS_PASS || undefined,
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PASS),
      },
    });

    const limiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'ratelimit',
      points: 1,
      duration: 1,
    });

    await limiter.consume(Number(req.ip));
  } catch (err) {
    throw new AppError('Requisições em excesso', 429);
  }
}
