import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import bcrypt from 'bcrypt';
import { User } from '../infra/typeorm/entities/User';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const isEmailAlreadyExists = await userRepository.findByEmail(email);
    if (isEmailAlreadyExists) {
      throw new AppError('Este email já está em uso.');
    }

    const passwordEncrypted = await bcrypt.hash(password, 10);

    const user = userRepository.create({
      name,
      email,
      password: passwordEncrypted,
    });
    await userRepository.save(user);
    return user;
  }
}
