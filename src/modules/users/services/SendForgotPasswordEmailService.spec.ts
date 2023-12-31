import { AppError } from '@shared/errors/AppError';

import { CreateUserService } from './CreateUserService';
import { SendForgotPasswordEmailService } from './SendForgotPasswordEmailService';
import { MockUserRepository } from '../domain/repositories/mocks/MockUserRepository';
import { MockHashProvider } from '../providers/HashProvider/mocks/MockHashProvider';
import { MockUserTokenRepository } from '../domain/repositories/mocks/MockUserTokenRepository';

let mockUserRepository: MockUserRepository;
let mockHashProvider: MockHashProvider;
let mockUserTokenRepository: MockUserTokenRepository;
let createUserService: CreateUserService;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('send forgot password email', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    mockUserTokenRepository = new MockUserTokenRepository();
    mockHashProvider = new MockHashProvider();

    createUserService = new CreateUserService(
      mockUserRepository,
      mockHashProvider,
    );
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      mockUserRepository,
      mockUserTokenRepository,
    );
  });
  test('should be able to send a email', async () => {
    const user = await createUserService.execute({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    await expect(
      sendForgotPasswordEmailService.execute({
        email: user.email,
      }),
    ).resolves.not.toThrow();
  });
  test("should not be able to send a email, if email don't belong to a user in database.", async () => {
    const user = await createUserService.execute({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'teste2@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
