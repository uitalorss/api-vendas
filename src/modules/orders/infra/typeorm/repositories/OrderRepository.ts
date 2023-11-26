import { Repository, getRepository } from 'typeorm';
import { Order } from '../entities/Order';
import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';

export class OrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }
  public async findById(id: string) {
    const order = await this.ormRepository.findOne(id, {
      relations: ['customer', 'orderProduct'],
    });
    return order;
  }

  public async create({ customer, products }: ICreateOrder) {
    const order = this.ormRepository.create({
      customer: customer,
      orderProduct: products,
    });
    await this.ormRepository.save(order);

    return order;
  }
}
