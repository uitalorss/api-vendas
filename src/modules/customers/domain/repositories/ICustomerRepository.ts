import { ICostumer } from '../models/ICostumer';
import { ICreateCostumer } from '../models/ICreateCostumer';

export interface ICustomerRepository {
  findByName(name: string): Promise<ICostumer | undefined>;
  findByEmail(email: string): Promise<ICostumer | undefined>;
  findById(id: string): Promise<ICostumer | undefined>;
  find(): Promise<ICostumer[] | undefined>;
  create(data: ICreateCostumer): Promise<ICostumer>;
  remove(customer: ICostumer): Promise<ICostumer>;
  save(customer: ICostumer): Promise<ICostumer>;
}
