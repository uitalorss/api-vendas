import auth from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ICreateSession } from '../domain/models/ICreateSession';
import { ISession } from '../domain/models/ISession';
import { inject, injectable } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
export class CreateSessionService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}
  public async execute({ email, password }: ICreateSession): Promise<ISession> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Usuário e/ou senha inválidos', 404);
    }
    const validatePassword = await compare(password, user.password);
    if (!validatePassword) {
      throw new AppError('Usuário e/ou senha inválidos', 404);
    }

    const token = sign({}, auth.jwt.secret_key, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });

    const dataUser = instanceToInstance(user);

    return { user: dataUser, token };
  }
}
