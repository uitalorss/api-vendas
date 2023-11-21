import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { addHours, isAfter } from 'date-fns';
import { hash } from 'bcrypt';
import { UserTokenRepository } from '../infra/typeorm/repositories/UserTokenRepository';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { inject } from 'tsyringe';
import { User } from '../infra/typeorm/entities/User';

interface IRequest {
  token: string;
  password: string;
}

export class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: UserTokenRepository,
  ) {}
  public async execute({ token, password }: IRequest) {
    const userToken = await this.userTokenRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('Token inválido');
    }

    const user = await this.userRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError('Usuário inválido');
    }

    const compareDate = addHours(userToken.created_at, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado.');
    }

    const encryptedPassword = await hash(password, 10);
    user.password = encryptedPassword;
    this.userRepository.save(user);
  }
}
