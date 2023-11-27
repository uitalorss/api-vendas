import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { CustomerRepository } from '@modules/customers/infra/typeorm/repositories/CustomerRepository';
import { IOrderRepository } from '@modules/orders/domain/repositories/IOrderRepository';
import { OrderRepository } from '@modules/orders/infra/typeorm/repositories/OrderRepository';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductRepository';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { IUserTokenRepository } from '@modules/users/domain/repositories/IUserTokenRepository';
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';
import { UserTokenRepository } from '@modules/users/infra/typeorm/repositories/UserTokenRepository';
import { container } from 'tsyringe';
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';
import { HashProvider } from '@modules/users/providers/HashProvider/implementations/HashProvider';

container.registerSingleton<ICustomerRepository>(
  'CustomerRepository',
  CustomerRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);
container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);

container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  OrderRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', HashProvider);
