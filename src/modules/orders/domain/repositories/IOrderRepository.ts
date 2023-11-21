import { IOrder } from '../models/IOrder';
import { ICreateOrder } from '../models/ICreateOrder';

export interface IOrderRepository {
  findById(id: string): Promise<IOrder | undefined>;
  create(data: ICreateOrder): Promise<IOrder>;
}
