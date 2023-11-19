import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomerRepository';
import { inject, injectable } from 'tsyringe';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

@injectable()
export class UpdateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}
  public async execute({ id, name, email }: IRequest) {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new AppError('Cliente não encontrado', 404);
    }

    const customerEmailAlreadyInUse =
      await this.customerRepository.findByEmail(email);

    if (
      customerEmailAlreadyInUse &&
      customerEmailAlreadyInUse.id !== customer.id
    ) {
      throw new AppError('Esse email já se encontra em uso.');
    }

    customer.name = name;
    customer.email = email;

    await this.customerRepository.save(customer);
  }
}
