import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { addHours, isAfter } from 'date-fns';
import { hash } from 'bcrypt';
import { UserTokenRepository } from '../infra/typeorm/repositories/UserTokenRepository';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';

interface IRequest {
  token: string;
  password: string;
}

export class ResetPasswordService {
  public async execute({ token, password }: IRequest) {
    const userTokenRepository = getCustomRepository(UserTokenRepository);
    const userRepository = getCustomRepository(UserRepository);

    const userToken = await userTokenRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('Token inválido');
    }

    const user = await userRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError('Usuário inválido');
    }

    const compareDate = addHours(userToken.created_at, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado.');
    }

    const encryptedPassword = await hash(password, 10);
    user.password = encryptedPassword;
    userRepository.save(user);
  }
}
