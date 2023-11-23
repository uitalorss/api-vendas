import { AppError } from '@shared/errors/AppError';
import { TestCustomerRepository } from '../domain/repositories/tests/TestCustomerRepository';
import { Customer } from '../infra/typeorm/entities/Customer';
import { CreateCustomerService } from './CreateCustomerService';
import { GetCustomerService } from './GetCustomerService';

let testCustomerRepository: TestCustomerRepository;
let createCustomerService: CreateCustomerService;
let getCustomerService: GetCustomerService;

describe('Get Customer', () => {
  beforeEach(() => {
    testCustomerRepository = new TestCustomerRepository();
    createCustomerService = new CreateCustomerService(testCustomerRepository);
    getCustomerService = new GetCustomerService(testCustomerRepository);
  });
  test('should be able to get a customer.', async () => {
    const customer = await createCustomerService.execute({
      name: 'teste',
      email: 'teste@teste.com',
    });

    expect(
      await getCustomerService.execute({ id: customer.id }),
    ).toBeInstanceOf(Customer);
  });
  test('should not be able to get a customer if your id not exists in database', async () => {
    expect(
      getCustomerService.execute({
        id: 'dd97dde1-a5f4-4117-8fd5-0f0a9a8bab8b',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
