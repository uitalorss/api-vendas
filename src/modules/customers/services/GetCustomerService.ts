import { getCustomRepository } from 'typeorm';
import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

export class GetCustomerService {
  public async execute({ id }: IRequest) {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customer = await customerRepository.findById(id);
    if (!customer) {
      throw new AppError('Cliente não encontrado', 404);
    }
    return customer;
  }
}
