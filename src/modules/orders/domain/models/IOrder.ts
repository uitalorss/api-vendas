import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICreateOrderProducts } from './ICreateOrderProducts';

export interface IOrder {
  id: string;
  customer: ICustomer;
  orderProduct: ICreateOrderProducts[];
  created_at: Date;
  updated_at: Date;
}
