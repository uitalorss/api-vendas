import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomerRepository';
import { ICreateCostumer } from '../domain/models/ICreateCostumer';

export class CreateCustomerService {
  public async execute({ name, email }: ICreateCostumer) {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customerEmailAlreadyInUse =
      await customerRepository.findByEmail(email);

    if (customerEmailAlreadyInUse) {
      throw new AppError('Esse email já se encontra em uso.');
    }

    const newCustomer = await customerRepository.create({
      name,
      email,
    });
  }
}
