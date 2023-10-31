import auth from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface IToken {
  iat: number;
  exp: number;
  sub: string;
}

export function handleAuthentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AppError('Token não informado.', 401);
  }

  try {
    const token = authorization.replace('Bearer ', '');
    const tokenDecoded = jwt.verify(token, auth.jwt.secret_key);

    const { sub } = tokenDecoded as IToken;

    req.user = {
      id: sub,
    };
    next();
  } catch {
    throw new AppError('Token inválido', 401);
  }
}
