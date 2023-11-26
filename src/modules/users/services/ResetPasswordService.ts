import { AppError } from '@shared/errors/AppError';
import { addHours, isAfter } from 'date-fns';
import { hash } from 'bcrypt';
import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUserTokenRepository } from '../domain/repositories/IUserTokenRepository';
import { IUsertokenRequest } from '../domain/models/IUserTokenRequest';

@injectable()
export class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}
  public async execute({ token, password }: IUsertokenRequest) {
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
