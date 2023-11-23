import { AppError } from '@shared/errors/AppError';
import { Customer } from '../infra/typeorm/entities/Customer';
import { CreateCustomerService } from './CreateCustomerService';
import { GetCustomerService } from './GetCustomerService';
import { MockCustomerRepository } from '../domain/repositories/mocks/MockCustomerRepository';

let mockCustomerRepository: MockCustomerRepository;
let createCustomerService: CreateCustomerService;
let getCustomerService: GetCustomerService;

describe('Get Customer', () => {
  beforeEach(() => {
    mockCustomerRepository = new MockCustomerRepository();
    createCustomerService = new CreateCustomerService(mockCustomerRepository);
    getCustomerService = new GetCustomerService(mockCustomerRepository);
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
