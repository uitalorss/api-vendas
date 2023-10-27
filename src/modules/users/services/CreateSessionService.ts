import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { AppError } from '@shared/errors/AppError';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { User } from '../typeorm/entities/User';

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

    const token = jwt.sign({}, 'd8ad4b5caf5544b6a78887695fe4bbb8', {
      subject: user.id,
      expiresIn: '1h',
    });

    const { password: _, ...allInfoUser } = user;

    return { user: allInfoUser, token };
  }
}
