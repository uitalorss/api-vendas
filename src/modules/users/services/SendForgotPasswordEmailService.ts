import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { AppError } from '@shared/errors/AppError';
import { UserTokenRepository } from '../typeorm/repositories/UserTokenRepository';
import { Mail } from '@config/Mail';
import template from '../../../templates/resetPassword.html';

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
    await Mail.sendMail({
      email,
      subject: 'Redefina sua senha',
      template: {
        template: `
        Olá {{name}}!! Segue link para redefinir a sua senha: http://localhost:3000?password/reset?token={{token}}
        `,
        variables: {
          name: user.name,
          token: userToken.token,
        },
      },
    });
  }
}
