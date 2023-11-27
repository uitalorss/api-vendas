import { AppError } from '@shared/errors/AppError';
import { IGetOrder } from '../domain/models/IGetOrder';
import { inject, injectable } from 'tsyringe';
import { IOrderRepository } from '../domain/repositories/IOrderRepository';

@injectable()
export class GetOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}
  public async execute({ order_id }: IGetOrder) {
    const order = await this.orderRepository.findById(order_id);
    if (!order) {
      throw new AppError('Pedido não encontrado', 404);
    }
    return order;
  }
}
