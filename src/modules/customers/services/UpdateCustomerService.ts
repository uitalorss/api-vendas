import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';

@injectable()
export class UpdateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}
  public async execute({ id, name, email }: IUpdateCustomer) {
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
    return customer;
  }
}
