import { inject, injectable } from 'tsyringe';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';

@injectable()
export class ListCustomersService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}
  public async execute() {
    const customers = await this.customerRepository.find();
    return customers;
  }
}
