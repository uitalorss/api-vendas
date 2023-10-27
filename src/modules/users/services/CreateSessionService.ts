import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { AppError } from '@shared/errors/AppError';
import bcrypt from 'bcrypt';
import { User } from '../typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
}

interface ISession {
  user: User;
}

export class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<User> {
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

    return user;
  }
}
