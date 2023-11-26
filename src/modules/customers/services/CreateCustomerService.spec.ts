import 'reflect-metadata';
import { MockCustomerRepository } from '../domain/repositories/mocks/MockCustomerRepository';
import { CreateCustomerService } from './CreateCustomerService';
import { AppError } from '@shared/errors/AppError';

let mockCustomerRepository: MockCustomerRepository;
let createCustomerService: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    mockCustomerRepository = new MockCustomerRepository();
    createCustomerService = new CreateCustomerService(mockCustomerRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomerService.execute({
      name: 'teste',
      email: 'teste@teste.com',
    });

    expect(customer).toHaveProperty('id');
  });

  test('should not be able to create a new customer with an email that already exists.', async () => {
    await createCustomerService.execute({
      name: 'teste',
      email: 'email@email.com',
    });

    expect(
      createCustomerService.execute({
        name: 'teste',
        email: 'email@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
