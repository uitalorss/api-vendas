import { getCustomRepository } from 'typeorm';
import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';
import { AppError } from '@shared/errors/AppError';
import e from 'express';

interface IRequest {
  id: string;
  name: string;
  email: string;
}
export class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest) {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customer = await customerRepository.findById(id);
    if (!customer) {
      throw new AppError('Cliente não encontrado', 404);
    }

    const customerEmailAlreadyInUse =
      await customerRepository.findByEmail(email);

    if (
      customerEmailAlreadyInUse &&
      customerEmailAlreadyInUse.id !== customer.id
    ) {
      throw new AppError('Esse email já se encontra em uso.');
    }

    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);
  }
}
