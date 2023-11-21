import { inject, injectable } from 'tsyringe';
import { IGetUser } from '../domain/modules/IGetUser';
import { AppError } from '@shared/errors/AppError';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';

@injectable()
export class ShowUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
  ) {}
  public async execute({ userId }: IGetUser) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }
    return user;
  }
}
