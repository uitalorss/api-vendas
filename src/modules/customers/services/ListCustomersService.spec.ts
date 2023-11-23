import { TestCustomerRepository } from '../domain/repositories/tests/TestCustomerRepository';
import { Customer } from '../infra/typeorm/entities/Customer';
import { ListCustomersService } from './ListCustomersService';

describe('List Customers', () => {
  test('Should be able to list all customers', async () => {
    const testCustomerRepository = new TestCustomerRepository();
    const listCustomersService = new ListCustomersService(
      testCustomerRepository,
    );

    const customers = await listCustomersService.execute();
    expect(customers).toBeInstanceOf(Array<Customer>);
  });
});
