import { AppError } from '@shared/errors/AppError';

import { CreateUserService } from './CreateUserService';
import { MockUserRepository } from '../domain/repositories/mocks/MockUserRepository';
import { MockHashProvider } from '../providers/HashProvider/mocks/MockHashProvider';

let mockUserRepository: MockUserRepository;
let mockHashProvider: MockHashProvider;
let createUserService: CreateUserService;

describe('Create User', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    mockHashProvider = new MockHashProvider();
    createUserService = new CreateUserService(
      mockUserRepository,
      mockHashProvider,
    );
  });
  test('should be able to create a user', async () => {
    const user = await createUserService.execute({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });
  test('should not be able to create a user if your email exists in database', async () => {
    await createUserService.execute({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(
      createUserService.execute({
        name: 'teste',
        email: 'teste@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
