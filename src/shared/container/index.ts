import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { CustomerRepository } from '@modules/customers/infra/typeorm/repositories/CustomerRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICustomerRepository>(
  'CustomerRepository',
  CustomerRepository,
);
