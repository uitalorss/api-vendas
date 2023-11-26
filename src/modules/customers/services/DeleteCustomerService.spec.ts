import { AppError } from '@shared/errors/AppError';
import { MockCustomerRepository } from '../domain/repositories/mocks/MockCustomerRepository';
import { CreateCustomerService } from './CreateCustomerService';
import { DeleteCustomerService } from './DeleteCustomerService';

let mockCustomerRepository: MockCustomerRepository;
let deleteCustomerService: DeleteCustomerService;
let createCustomerService: CreateCustomerService;

describe('Delete Customer', () => {
  beforeEach(() => {
    mockCustomerRepository = new MockCustomerRepository();
    deleteCustomerService = new DeleteCustomerService(mockCustomerRepository);
  });

  test('should be able to delete a customer', async () => {
    createCustomerService = new CreateCustomerService(mockCustomerRepository);
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
