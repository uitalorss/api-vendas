import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../entities/Order';
import { Customer } from '@modules/customers/infra/typeorm/entities/Customer';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
}

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  public async findById(id: string) {
    const order = await this.findOne(id, {
      relations: ['customer', 'orderProduct'],
    });
    return order;
  }

  public async createOrder({ customer, products }: IRequest) {
    const order = this.create({
      customer: customer,
      orderProduct: products,
    });
    await this.save(order);

    return order;
  }
}
