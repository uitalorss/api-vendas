import { getCustomRepository } from 'typeorm';
import { OrderRepository } from '../typeorm/repositories/OrderRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  order_id: string;
}

export class GetOrderService {
  public async execute({ order_id }: IRequest) {
    const orderRepository = getCustomRepository(OrderRepository);

    const order = await orderRepository.findById(order_id);
    if (!order) {
      throw new AppError('Pedido não encontrado', 404);
    }
    return order;
  }
}
