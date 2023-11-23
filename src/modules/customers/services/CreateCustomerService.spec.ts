import 'reflect-metadata';
import { TestCustomerRepository } from '../domain/repositories/tests/TestCustomerRepository';
import { CreateCustomerService } from './CreateCustomerService';
import { AppError } from '@shared/errors/AppError';
import { beforeEach } from 'node:test';

let testCustomerRepository: TestCustomerRepository;
let createCustomerService: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    testCustomerRepository = new TestCustomerRepository();
    createCustomerService = new CreateCustomerService(testCustomerRepository);
  });

  test('should be able to create a new customer', async () => {
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
