import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';

interface IRequest {
  userId: string;
}

export class GetUserService {
  public async execute({ userId }: IRequest) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }
    return user;
  }
}
