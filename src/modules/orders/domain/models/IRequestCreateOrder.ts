import { IProduct } from '@modules/products/domain/models/IProduct';
import { IRequestOrderProductProduct } from './IRequestOrderProductProduct';

export interface IRequestCreateOrder {
  customer_id: string;
  products: IRequestOrderProductProduct[];
}
