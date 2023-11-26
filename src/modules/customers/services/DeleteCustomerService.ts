import { AppError } from '@shared/errors/AppError';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';
import { inject, injectable } from 'tsyringe';
import { IGetCustomer } from '../domain/models/IGetCustomer';

@injectable()
export class DeleteCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ id }: IGetCustomer) {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new AppError('Cliente não encontrado', 404);
    }
    await this.customerRepository.remove(customer);
  }
}
