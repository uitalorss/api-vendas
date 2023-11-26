import { inject, injectable } from 'tsyringe';
import { IGetUser } from '../domain/models/IGetUser';
import { AppError } from '@shared/errors/AppError';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
export class ShowUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}
  public async execute({ userId }: IGetUser) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }
    return user;
  }
}
