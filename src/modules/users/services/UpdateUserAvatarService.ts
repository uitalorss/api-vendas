import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import fs from 'fs/promises';
import { IUpdateUserAvatar } from '../domain/models/IUpdateUserAvatar';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
export class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}
  public async execute({
    avatarFileName,
    userId,
  }: IUpdateUserAvatar): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    if (user.avatar) {
      await fs.unlink(`./uploads/${user.avatar}`);
    }

    user.avatar = avatarFileName;
    await this.userRepository.save(user);
  }
}
