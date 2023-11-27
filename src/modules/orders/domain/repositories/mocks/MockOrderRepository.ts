import { OrderRepository } from '@modules/orders/infra/typeorm/repositories/OrderRepository';
import { ICreateOrder } from '../../models/ICreateOrder';
import { IOrder } from '../../models/IOrder';
import { IOrderRepository } from '../IOrderRepository';
import { Order } from '@modules/orders/infra/typeorm/entities/Order';
import { v4 as uuidv4 } from 'uuid';

export class MockOrderRepository implements IOrderRepository {
  private orderRepository: Order[] = [];

  public async findById(id: string): Promise<IOrder | undefined> {
    const order = this.orderRepository.find(item => item.id === id);
    return order;
  }
  public async create({ customer, products }: ICreateOrder): Promise<IOrder> {
    const order = new Order();
    order.id = uuidv4();
    order.customer = customer;
    order.orderProduct = [];
    this.orderRepository.push(order);

    return order;
  }
}
