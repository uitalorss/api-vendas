import { AppError } from '@shared/errors/AppError';
import { Customer } from '../infra/typeorm/entities/Customer';
import { CreateCustomerService } from './CreateCustomerService';
import { UpdateCustomerService } from './UpdateCustomerService';
import { MockCustomerRepository } from '../domain/repositories/mocks/MockCustomerRepository';

let mockCustomerRepository: MockCustomerRepository;
let updateCustomerService: UpdateCustomerService;
let createCustomerService: CreateCustomerService;

describe('Update Customer', () => {
  beforeEach(() => {
    mockCustomerRepository = new MockCustomerRepository();
    createCustomerService = new CreateCustomerService(mockCustomerRepository);
    updateCustomerService = new UpdateCustomerService(mockCustomerRepository);
  });
  test('should be able to update informations of a customer', async () => {
    const customer = await createCustomerService.execute({
      name: 'teste',
      email: 'teste@email.com',
    });

    expect(await updateCustomerService.execute(customer)).toBeInstanceOf(
      Customer,
    );
  });
  test('should be able to identify that customer will be updated not exists', async () => {
    const customer = {
      id: 'dd97dde1-a5f4-4117-8fd5-0f0a9a8bab8b',
      name: 'teste',
      email: 'teste@email.com',
    };

    expect(updateCustomerService.execute(customer)).rejects.toBeInstanceOf(
      AppError,
    );
  });
  test("should be able to identify that email that will be updated already exists in database and don't belong to customer to want to update", async () => {
    await createCustomerService.execute({
      name: 'teste',
      email: 'teste@email.com',
    });

    const customerToBeUpdated = await createCustomerService.execute({
      name: 'teste',
      email: 'teste2@email.com',
    });

    expect(
      updateCustomerService.execute({
        id: customerToBeUpdated.id,
        name: customerToBeUpdated.name,
        email: 'teste@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
