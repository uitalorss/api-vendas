import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';
import { IGetCustomer } from '../domain/models/IGetCustomer';

@injectable()
export class GetCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}
  public async execute({ id }: IGetCustomer) {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new AppError('Cliente não encontrado', 404);
    }
    return customer;
  }
}
