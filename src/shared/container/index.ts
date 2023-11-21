import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { CustomerRepository } from '@modules/customers/infra/typeorm/repositories/CustomerRepository';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { IUserTokenRepository } from '@modules/users/domain/repositories/IUserTokenRepository';
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';
import { UserTokenRepository } from '@modules/users/infra/typeorm/repositories/UserTokenRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICustomerRepository>(
  'CustomerRepository',
  CustomerRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);
