import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { AppError } from '@shared/errors/AppError';
import { UserTokenRepository } from '../typeorm/repositories/UserTokenRepository';
import { Mail } from '@config/Mail';
import path from 'path';

interface IRequest {
  email: string;
}

const templateResetPassword = path.resolve(
  __dirname,
  '..',
  '..',
  '..',
  'templates',
  'resetPassword.hbs',
);

export class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest) {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email inválido');
    }

    const userToken = await userTokenRepository.generateToken(user.id);
    await Mail.sendMail({
      email,
      subject: 'Redefina sua senha',
      template: {
        template: templateResetPassword,
        variables: {
          name: user.name,
          token: userToken.token,
        },
      },
    });
  }
}
