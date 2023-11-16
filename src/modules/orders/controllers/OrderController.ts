import { Request, Response } from 'express';
import { CreateOrderService } from '../services/CreateOrderService';
import { GetOrderService } from '../services/GetOrderService';

export class OrderController {
  public async createOrder(req: Request, res: Response) {
    const { customer_id, products } = req.body;
    const createOrderService = new CreateOrderService();

    const order = await createOrderService.execute({ customer_id, products });
    return res.status(201).json(order);
  }

  public async getOrder(req: Request, res: Response) {
    const { id } = req.params;
    const getOrderService = new GetOrderService();

    const order = await getOrderService.execute({ order_id: id });
    return res.status(200).json(order);
  }
}