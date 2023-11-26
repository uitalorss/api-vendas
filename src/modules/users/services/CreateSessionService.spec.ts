import { AppError } from '@shared/errors/AppError';
import { ISession } from '../domain/models/ISession';
import { MockUserRepository } from '../domain/repositories/mocks/MockUserRepository';
import { CreateSessionService } from './CreateSessionService';
import { CreateUserService } from './CreateUserService';

let mockUserRepository: MockUserRepository;
let createUserService: CreateUserService;
let createSessionService: CreateSessionService;

describe('CreateSession', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    createUserService = new CreateUserService(mockUserRepository);
    createSessionService = new CreateSessionService(mockUserRepository);
  });
  test('should be able to create a session', async () => {
    await createUserService.execute({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    const session = await createSessionService.execute({
      email: 'teste@teste.com',
      password: '123456',
    });
    expect(session).toHaveProperty('token');
  });
  test('should not be able to create a session if user not to exist.', async () => {
    await createUserService.execute({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });
    expect(
      createSessionService.execute({
        email: 'teste2@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  test('Should not be able to create a session if password is wrong', async () => {
    await createUserService.execute({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });
    expect(
      createSessionService.execute({
        email: 'teste@teste.com',
        password: '1234562',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
