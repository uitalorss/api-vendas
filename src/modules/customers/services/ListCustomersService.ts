import { getCustomRepository } from 'typeorm';
import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';

export class ListCustomersService {
  public async execute() {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customers = await customerRepository.find();
    return customers;
  }
}
