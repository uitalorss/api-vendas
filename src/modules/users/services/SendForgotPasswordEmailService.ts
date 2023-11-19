import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { Mail } from '@config/Mail';
import path from 'path';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { UserTokenRepository } from '../infra/typeorm/repositories/UserTokenRepository';

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
