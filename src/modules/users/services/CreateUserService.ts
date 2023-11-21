import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import bcrypt from 'bcrypt';
import { User } from '../infra/typeorm/entities/User';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { ICreateUser } from '../domain/models/ICreateUser';
import { inject, injectable } from 'tsyringe';
import { CustomerRepository } from '@modules/customers/infra/typeorm/repositories/CustomerRepository';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
  ) {}
  public async execute({ name, email, password }: ICreateUser): Promise<User> {
    const isEmailAlreadyExists = await this.userRepository.findByEmail(email);
    if (isEmailAlreadyExists) {
      throw new AppError('Este email já está em uso.');
    }

    const passwordEncrypted = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      name,
      email,
      password: passwordEncrypted,
    });

    return user;
  }
}
