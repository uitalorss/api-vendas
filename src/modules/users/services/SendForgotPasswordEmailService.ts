import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { AppError } from '@shared/errors/AppError';
import { UserTokenRepository } from '../typeorm/repositories/UserTokenRepository';
import { Mail } from '@config/Mail';

interface IRequest {
  email: string;
}

export class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest) {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email inválido');
    }

    const userToken = await userTokenRepository.generateToken(user.id);
    await Mail.sendMail({ email, token: userToken.token });
  }
}
