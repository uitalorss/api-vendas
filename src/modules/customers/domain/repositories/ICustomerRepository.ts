import { ICreateCustomer } from '../models/ICreateCustomer';
import { ICustomer } from '../models/ICustomer';

export interface ICustomerRepository {
  findByName(name: string): Promise<ICustomer | null>;
  findByEmail(email: string): Promise<ICustomer | null>;
  findById(id: string): Promise<ICustomer | null>;
  find(): Promise<ICustomer[] | null>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  remove(customer: ICustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
}
