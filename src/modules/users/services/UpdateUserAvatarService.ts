import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import fs from 'fs/promises';
import { IUpdateUserAvatar } from '../domain/models/IUpdateUserAvatar';
import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';

@injectable()
export class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
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
