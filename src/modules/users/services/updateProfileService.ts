import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { compare, hash } from 'bcrypt';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { IUpdateUser } from '../domain/modules/IUpdateUser';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
  ) {}
  public async execute({
    userId,
    name,
    email,
    password,
    oldPassword,
  }: IUpdateUser) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }
    const userAlreadyUseThisEmail =
      await this.userRepository.findByEmail(email);

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

    await this.userRepository.save(user);
  }
}
