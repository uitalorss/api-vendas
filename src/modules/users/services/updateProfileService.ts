import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { compare, hash } from 'bcrypt';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

export class UpdateProfileService {
  public async execute({
    userId,
    name,
    email,
    password,
    oldPassword,
  }: IRequest) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }
    const userAlreadyUseThisEmail = await userRepository.findByEmail(email);

    if (userAlreadyUseThisEmail && userAlreadyUseThisEmail.id !== user.id) {
      throw new AppError('Esse email já se encontra em uso.');
    }

    if (password) {
      if (!oldPassword) {
        throw new AppError('A senha antiga precisa também ser enviada.');
      }
      const checkPassword = await compare(oldPassword, user.password);
      if (!checkPassword) {
        throw new AppError('Senha inválida');
      }

      const encryptedPassword = await hash(password, 10);
      user.password = encryptedPassword;
    }

    user.name = name;
    user.email = email;

    await userRepository.save(user);
  }
}
