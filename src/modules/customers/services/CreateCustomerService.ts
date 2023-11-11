import { getCustomRepository } from 'typeorm';
import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
}

export class CreateCustomerService {
  public async execute({ name, email }: IRequest) {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customerEmailAlreadyInUse =
      await customerRepository.findByEmail(email);

    if (customerEmailAlreadyInUse) {
      throw new AppError('Esse email já se encontra em uso.');
    }

    const newCustomer = customerRepository.create({
      name,
      email,
    });
    await customerRepository.save(newCustomer);
  }
}
