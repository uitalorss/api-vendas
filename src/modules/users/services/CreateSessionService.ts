import auth from '@config/auth';
import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IUserResponse {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

interface ISession {
  user: IUserResponse;
  token: string;
}

export class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<ISession> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new AppError('Usuário e/ou senha inválidos', 404);
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      throw new AppError('Usuário e/ou senha inválidos', 404);
    }

    const token = jwt.sign({}, auth.jwt.secret_key, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });

    const { password: _, ...allInfoUser } = user;

    return { user: allInfoUser, token };
  }
}
