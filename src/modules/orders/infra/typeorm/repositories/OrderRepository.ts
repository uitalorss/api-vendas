import { Repository, getRepository } from 'typeorm';
import { Order } from '../entities/Order';
import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { dataSource } from '@shared/infra/typeorm';

export class OrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Order);
  }
  public async findById(id: string) {
    const order = await this.ormRepository.findOne({
      where: { id },
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
