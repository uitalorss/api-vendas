import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { OrderRepository } from '../infra/typeorm/repositories/OrderRepository';
import { IGetOrder } from '../domain/models/IGetOrder';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: OrderRepository,
  ) {}
  public async execute({ order_id }: IGetOrder) {
    const order = await this.orderRepository.findById(order_id);
    if (!order) {
      throw new AppError('Pedido não encontrado', 404);
    }
    return order;
  }
}
