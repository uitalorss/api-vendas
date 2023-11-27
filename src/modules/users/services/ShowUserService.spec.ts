import { AppError } from '@shared/errors/AppError';
import { MockUserRepository } from '../domain/repositories/mocks/MockUserRepository';
import { User } from '../infra/typeorm/entities/User';
import { CreateUserService } from './CreateUserService';
import { ShowUserService } from './showUserService';
import { MockHashProvider } from '../providers/HashProvider/mocks/MockHashProvider';

let mockUserRepository: MockUserRepository;
let mockHashProvider: MockHashProvider;
let createUserService: CreateUserService;
let showUserService: ShowUserService;

describe('Show User', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    mockHashProvider = new MockHashProvider();
    showUserService = new ShowUserService(mockUserRepository);
    createUserService = new CreateUserService(
      mockUserRepository,
      mockHashProvider,
    );
  });
  test('should be able to show a user', async () => {
    const user = await createUserService.execute({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(await showUserService.execute({ userId: user.id })).toBeInstanceOf(
      User,
    );
  });
  test('should not be able to show a user if your id not to exist in database', async () => {
    expect(
      showUserService.execute({
        userId: 'd56b4f5c-b405-4dc8-96e9-838ef43c4f7f',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
