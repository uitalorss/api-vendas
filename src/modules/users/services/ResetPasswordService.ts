import { getCustomRepository } from 'typeorm';
import { UserTokenRepository } from '../typeorm/repositories/UserTokenRepository';
import { AppError } from '@shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { addHours, isAfter } from 'date-fns';
import { hash } from 'bcrypt';

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
    if (isAfter(compareDate, Date.now())) {
      throw new AppError('Token expirado.');
    }

    const encryptedPassword = await hash(password, 10);
    user.password = encryptedPassword;
    userRepository.save(user);
  }
}
