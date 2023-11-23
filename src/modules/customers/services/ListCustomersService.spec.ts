import { MockCustomerRepository } from '../domain/repositories/mocks/MockCustomerRepository';
import { Customer } from '../infra/typeorm/entities/Customer';
import { ListCustomersService } from './ListCustomersService';

describe('List Customers', () => {
  test('Should be able to list all customers', async () => {
    const mockCustomerRepository = new MockCustomerRepository();
    const listCustomersService = new ListCustomersService(
      mockCustomerRepository,
    );

    const customers = await listCustomersService.execute();
    expect(customers).toBeInstanceOf(Array<Customer>);
  });
});
