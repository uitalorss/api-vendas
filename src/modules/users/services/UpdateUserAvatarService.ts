import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { AppError } from '@shared/errors/AppError';
import { User } from '../typeorm/entities/User';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

export class UpdateUserAvatarService {
  public async execute({ avatarFileName, userId }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }
    user.avatar = avatarFileName;
    userRepository.save(user);
  }
}
