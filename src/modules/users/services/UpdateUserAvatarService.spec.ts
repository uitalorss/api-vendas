import { create } from 'domain';
import { MockUserRepository } from '../domain/repositories/mocks/MockUserRepository';
import { CreateUserService } from './CreateUserService';
import { UpdateUserAvatarService } from './UpdateUserAvatarService';
import { User } from '../infra/typeorm/entities/User';
import { AppError } from '@shared/errors/AppError';
import { MockHashProvider } from '../providers/HashProvider/mocks/MockHashProvider';

let mockUserRepository: MockUserRepository;
let mockHashProvider: MockHashProvider;
let createUserService: CreateUserService;
let updateUserAvatarService: UpdateUserAvatarService;

describe('Update avatar', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    mockHashProvider = new MockHashProvider();
    createUserService = new CreateUserService(
      mockUserRepository,
      mockHashProvider,
    );
    updateUserAvatarService = new UpdateUserAvatarService(mockUserRepository);
  });
  test("should be able to update user's avatar.", async () => {
    const user = await createUserService.execute({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      userId: user.id,
      avatarFileName: 'image.jpg',
    }),
      expect(user.avatar).toBeTruthy();
  });
  test("should not be able to update user's avatar if user not to exist.", async () => {
    const user = await createUserService.execute({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });
    expect(
      updateUserAvatarService.execute({
        userId: '92ed1a77-de15-46ab-88ba-84803570d9b4',
        avatarFileName: 'image.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
