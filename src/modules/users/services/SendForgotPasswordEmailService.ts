import { AppError } from '@shared/errors/AppError';
import { Mail } from '@config/Mail';
import path from 'path';
import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUserTokenRepository } from '../domain/repositories/IUserTokenRepository';
import { ISendForgotPasswordEmailRequest } from '../domain/models/ISendForgotPasswordEmailRequest';

const templateResetPassword = path.resolve(
  __dirname,
  '..',
  '..',
  '..',
  'templates',
  'resetPassword.hbs',
);

@injectable()
export class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}
  public async execute({ email }: ISendForgotPasswordEmailRequest) {
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
    return userToken;
  }
}
