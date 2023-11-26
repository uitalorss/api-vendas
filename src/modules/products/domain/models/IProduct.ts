import { IOrderProduct } from '@modules/orders/domain/models/IOrderProduct';

export interface IProduct {
  id: string;
  name: string;
  order_product?: IOrderProduct[];
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}
