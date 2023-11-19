import { Repository, getRepository } from 'typeorm';
import { Customer } from '../entities/Customer';
import { ICreateCostumer } from '@modules/customers/domain/models/ICreateCostumer';
import { ICostumer } from '@modules/customers/domain/models/ICostumer';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';

export class CustomerRepository implements ICustomerRepository {
  private ormRepository: Repository<Customer>;
  constructor() {
    this.ormRepository = getRepository(Customer);
  }
  public async findByName(name: string) {
    const customer = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return customer;
  }

  public async findByEmail(email: string) {
    const customer = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return customer;
  }

  public async findById(id: string) {
    const customer = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    return customer;
  }

  public async create({ name, email }: ICreateCostumer) {
    const customer = this.ormRepository.create({ name, email });
    await this.ormRepository.save(customer);

    return customer;
  }

  public async save(customer: Customer) {
    return this.ormRepository.save(customer);
  }

  public async remove(customer: ICostumer) {
    return this.ormRepository.remove(customer);
  }

  public async find() {
    return this.ormRepository.find();
  }
}
