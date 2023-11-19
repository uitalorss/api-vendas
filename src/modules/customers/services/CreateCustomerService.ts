import { AppError } from '@shared/errors/AppError';
import { ICreateCostumer } from '../domain/models/ICreateCostumer';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}
  public async execute({ name, email }: ICreateCostumer) {
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
