import { AppError } from '@shared/errors/AppError';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';
import { inject, injectable } from 'tsyringe';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';

@injectable()
export class CreateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}
  public async execute({ name, email }: ICreateCustomer) {
    const customerEmailAlreadyInUse =
      await this.customerRepository.findByEmail(email);

    if (customerEmailAlreadyInUse) {
      throw new AppError('Esse email já se encontra em uso.');
    }

    const newCustomer = await this.customerRepository.create({
      name,
      email,
    });
  }
}
