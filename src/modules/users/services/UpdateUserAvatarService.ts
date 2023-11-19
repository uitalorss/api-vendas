import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import fs from 'fs/promises';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

export class UpdateUserAvatarService {
  public async execute({ avatarFileName, userId }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    if (user.avatar) {
      await fs.unlink(`./uploads/${user.avatar}`);
    }

    user.avatar = avatarFileName;
    await userRepository.save(user);
  }
}
