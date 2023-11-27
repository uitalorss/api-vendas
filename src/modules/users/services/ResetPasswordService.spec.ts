import { AppError } from '@shared/errors/AppError';
import { MockUserRepository } from '../domain/repositories/mocks/MockUserRepository';
import { MockUserTokenRepository } from '../domain/repositories/mocks/MockUserTokenRepository';
import { CreateUserService } from './CreateUserService';
import { ResetPasswordService } from './ResetPasswordService';
import { SendForgotPasswordEmailService } from './SendForgotPasswordEmailService';
import { MockHashProvider } from '../providers/HashProvider/mocks/MockHashProvider';

let mockUserRepository: MockUserRepository;
let mockHashProvider: MockHashProvider;
let mockUserTokenRepository: MockUserTokenRepository;
let createUserService: CreateUserService;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;
let resetPasswordService: ResetPasswordService;

describe('Reset password', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    mockUserTokenRepository = new MockUserTokenRepository();
    mockHashProvider = new MockHashProvider();

    createUserService = new CreateUserService(
      mockUserRepository,
      mockHashProvider,
    );
    resetPasswordService = new ResetPasswordService(
      mockUserRepository,
      mockUserTokenRepository,
      mockHashProvider,
    );
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      mockUserRepository,
      mockUserTokenRepository,
    );
  });

  test("should be able to reset a user's password", async () => {
    const user = await createUserService.execute({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    const userToken = await sendForgotPasswordEmailService.execute({
      email: user.email,
    });

    expect(
      resetPasswordService.execute({
        token: userToken.token,
        password: '1234567',
      }),
    ).resolves.not.toThrow();
  });
  test('should not be able to reset a password if token is invalid', async () => {
    const user = await createUserService.execute({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    const userToken = await sendForgotPasswordEmailService.execute({
      email: user.email,
    });

    expect(
      resetPasswordService.execute({
        token: '4a542662-cc94-4783-a87b-701887e4d5f2',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  test('should not be able to reset a password if user_id is invalid', async () => {
    const user = await createUserService.execute({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    const userToken = await sendForgotPasswordEmailService.execute({
      email: user.email,
    });

    await mockUserRepository.remove(user);

    expect(
      resetPasswordService.execute({
        token: userToken.token,
        password: '222222',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  test('should not be able to reset a password if token has expired.', async () => {
    const user = await createUserService.execute({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: user.email,
    });

    const userToken = await sendForgotPasswordEmailService.execute({
      email: user.email,
    });

    expect(
      resetPasswordService.execute({
        token: userToken.token,
        password: '222222',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
