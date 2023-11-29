import { IOrder } from '../models/IOrder';
import { ICreateOrder } from '../models/ICreateOrder';

export interface IOrderRepository {
  findById(id: string): Promise<IOrder | null>;
  create(data: ICreateOrder): Promise<IOrder>;
}
