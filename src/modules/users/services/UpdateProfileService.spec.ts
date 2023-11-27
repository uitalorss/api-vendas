import { AppError } from '@shared/errors/AppError';
import { MockUserRepository } from '../domain/repositories/mocks/MockUserRepository';
import { CreateUserService } from './CreateUserService';
import { UpdateProfileService } from './updateProfileService';
import { MockHashProvider } from '../providers/HashProvider/mocks/MockHashProvider';

let mockUserRepository: MockUserRepository;
let mockHashProvider: MockHashProvider;
let createUserService: CreateUserService;
let updateProfileService: UpdateProfileService;

describe('Update profile', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    mockHashProvider = new MockHashProvider();
    createUserService = new CreateUserService(
      mockUserRepository,
      mockHashProvider,
    );
    updateProfileService = new UpdateProfileService(
      mockUserRepository,
      mockHashProvider,
    );
  });
  test('should be able to update a user', async () => {
    const user = await createUserService.execute({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(
      await updateProfileService.execute({
        userId: user.id,
        name: user.name,
        email: user.email,
      }),
    );
  });
  test('should not be able to update a user if user not to exist in database', async () => {
    const user = await createUserService.execute({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });
    expect(
      updateProfileService.execute({
        userId: '76f6b31c-da44-44f9-8aca-a72236c79610',
        name: user.name,
        email: user.email,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  test('should not be able to update a user if email that will be update already exists in database and dont belong to user that will be updated.', async () => {
    await createUserService.execute({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });
    const userToBeUpdated = await createUserService.execute({
      name: 'teste',
      email: 'teste2@teste.com',
      password: '123456',
    });
    expect(
      updateProfileService.execute({
        userId: userToBeUpdated.id,
        name: userToBeUpdated.name,
        email: 'teste@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  test('should not be able to update a user when trying to update password, the old password was not be sent.', async () => {
    const user = await createUserService.execute({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });
    expect(
      updateProfileService.execute({
        userId: user.id,
        name: user.name,
        email: user.email,
        password: '232323',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  test('should not be able to update a user when trying to update password, the old password is not the same as the database.', async () => {
    const user = await createUserService.execute({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });
    expect(
      updateProfileService.execute({
        userId: user.id,
        name: user.name,
        email: user.email,
        password: '232323',
        oldPassword: '232323',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
