import { Customer } from '@modules/customers/infra/typeorm/entities/Customer';
import { ICreateCustomer } from '../../models/ICreateCustomer';
import { v4 as uuidv4 } from 'uuid';
import { ICustomerRepository } from '../ICustomerRepository';

export class TestCustomerRepository implements ICustomerRepository {
  private customers: Customer[] = [];

  public async findByName(name: string) {
    const customer = this.customers.find(item => item.name === name);
    return customer;
  }

  public async findByEmail(email: string) {
    const customer = this.customers.find(item => item.email === email);
    return customer;
  }

  public async findById(id: string) {
    const customer = this.customers.find(item => item.id === id);
    return customer;
  }

  public async create({ name, email }: ICreateCustomer) {
    const customer = new Customer();

    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);
    return customer;
  }

  public async save(customer: Customer) {
    const findCustomer = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    );

    this.customers[findCustomer] = customer;
    return customer;
  }

  public async remove(customer: Customer) {
    this.customers.filter(item => {
      item.id !== customer.id;
    });
    return customer;
  }

  public async find() {
    return undefined;
  }
}
