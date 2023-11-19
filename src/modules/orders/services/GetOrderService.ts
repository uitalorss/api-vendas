import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { OrderRepository } from '../infra/typeorm/repositories/OrderRepository';

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
