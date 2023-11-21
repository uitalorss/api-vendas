import { IProduct } from '@modules/products/domain/modules/IProduct';
import { IOrder } from './IOrder';

export interface IOrderProduct {
  id: string;
  order: IOrder;
  product: IProduct;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}
