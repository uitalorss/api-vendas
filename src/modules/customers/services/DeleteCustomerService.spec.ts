import { AppError } from '@shared/errors/AppError';
import { TestCustomerRepository } from '../domain/repositories/tests/TestCustomerRepository';
import { CreateCustomerService } from './CreateCustomerService';
import { DeleteCustomerService } from './DeleteCustomerService';

let testCustomerRepository: TestCustomerRepository;
let deleteCustomerService: DeleteCustomerService;
let createCustomerService: CreateCustomerService;

describe('Delete Customer', () => {
  beforeEach(() => {
    testCustomerRepository = new TestCustomerRepository();
    deleteCustomerService = new DeleteCustomerService(testCustomerRepository);
  });

  test('should be able to delete a customer', async () => {
    createCustomerService = new CreateCustomerService(testCustomerRepository);
    const customer = await createCustomerService.execute({
      name: 'teste',
      email: 'teste@teste.com',
    });

    expect(await deleteCustomerService.execute({ id: customer.id }));
  });
  test('should not be able to delete a customer if your id not exists in database', async () => {
    expect(
      deleteCustomerService.execute({
        id: 'dd97dde1-a5f4-4117-8fd5-0f0a9a8bab8b',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
