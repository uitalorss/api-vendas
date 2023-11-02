import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { AppError } from '@shared/errors/AppError';

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
    const { password: _, ...dataUser } = user;
    return dataUser;
  }
}
