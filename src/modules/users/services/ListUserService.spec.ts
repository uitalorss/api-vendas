import { MockUserRepository } from '../domain/repositories/mocks/MockUserRepository';
import { User } from '../infra/typeorm/entities/User';
import { ListUserService } from './ListUserService';

describe('List users', () => {
  test('should be able to list all users', async () => {
    const mockUserRepository = new MockUserRepository();
    const listUserService = new ListUserService(mockUserRepository);

    const users = await listUserService.execute();
    expect(users).toBeInstanceOf(Array<User>);
  });
});
