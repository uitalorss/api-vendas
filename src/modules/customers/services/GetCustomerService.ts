import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomerRepository';

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
