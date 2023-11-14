import { getCustomRepository } from 'typeorm';
import { OrderRepository } from '../typeorm/repositories/OrderRepository';
import { CustomerRepository } from '@modules/customers/typeorm/repositories/CustomerRepository';
import { AppError } from '@shared/errors/AppError';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductRepository';

interface IProduct {
  price: number;
  product_id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export class createOrderService {
  public async execute({ customer_id, products }: IRequest) {
    const orderRepository = getCustomRepository(OrderRepository);
    const customerRepository = getCustomRepository(CustomerRepository);
    const productRepository = getCustomRepository(ProductRepository);
    const customer = await customerRepository.findById(customer_id);
    if (!customer) {
      throw new AppError('Cliente não encontrado', 404);
    }

    products.map(async product => {
      const item = await productRepository.findOne(product.product_id);
      if (!item) {
        throw new AppError(`Produto com id ${product.product_id}`, 404);
      }
      if (product.quantity > item.quantity) {
        throw new AppError(
          `Produto ${product.product_id} com quantidade pedida maior que o estoque.`,
        );
      }
    });

    const newOrder = await orderRepository.createOrder({ customer, products });

    const { orderProduct } = newOrder;
    orderProduct.map(async product => {
      const productItem = await productRepository.findOne(product.id);
      if (productItem) {
        productItem.quantity = productItem.quantity - product.quantity;
        await productRepository.save(productItem);
      }
    });

    return newOrder;
  }
}
