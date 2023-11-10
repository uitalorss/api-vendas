import { Entity, EntityRepository, Repository } from 'typeorm';
import { Customer } from '../entities/Customer';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  public async findByName(name: string) {
    const customer = await this.find({
      where: {
        name,
      },
    });

    return customer;
  }

  public async findByEmail(email: string) {
    const customer = await this.find({
      where: {
        email,
      },
    });

    return customer;
  }

  public async findById(id: string) {
    const customer = await this.findOne({
      where: {
        id,
      },
    });
    return customer;
  }
}
