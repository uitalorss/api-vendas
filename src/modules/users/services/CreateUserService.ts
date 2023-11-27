import { AppError } from '@shared/errors/AppError';
import { User } from '../infra/typeorm/entities/User';
import { ICreateUser } from '../domain/models/ICreateUser';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}
  public async execute({ name, email, password }: ICreateUser): Promise<User> {
    const isEmailAlreadyExists = await this.userRepository.findByEmail(email);
    if (isEmailAlreadyExists) {
      throw new AppError('Este email já está em uso.');
    }

    const passwordEncrypted = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordEncrypted,
    });

    return user;
  }
}
