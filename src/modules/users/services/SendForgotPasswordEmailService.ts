import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { Mail } from '@config/Mail';
import path from 'path';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { UserTokenRepository } from '../infra/typeorm/repositories/UserTokenRepository';
import { inject } from 'tsyringe';

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
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: UserTokenRepository,
  ) {}
  public async execute({ email }: IRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email inválido');
    }

    const userToken = await this.userTokenRepository.generateToken(user.id);
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
