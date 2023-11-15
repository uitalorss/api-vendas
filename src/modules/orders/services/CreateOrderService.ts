import { getCustomRepository } from 'typeorm';
import { OrderRepository } from '../typeorm/repositories/OrderRepository';
import { CustomerRepository } from '@modules/customers/typeorm/repositories/CustomerRepository';
import { AppError } from '@shared/errors/AppError';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductRepository';
import { Product } from '@modules/products/typeorm/entities/Product';
import { not } from 'joi';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export class CreateOrderService {
  public async execute({ customer_id, products }: IRequest) {
    const orderRepository = getCustomRepository(OrderRepository);
    const customerRepository = getCustomRepository(CustomerRepository);
    const productRepository = getCustomRepository(ProductRepository);
    const customer = await customerRepository.findById(customer_id);
    if (!customer) {
      throw new AppError('Cliente não encontrado', 404);
    }

    const dbProducts = await productRepository.findProducts(products);

    if (!dbProducts.length) {
      throw new AppError('Nenhum produto informado existe.', 404);
    }

    const idProducts = dbProducts.map(product => product.id);

    const productsThatNotExists = products.filter(item => {
      return !idProducts.includes(item.id);
    });

    if (productsThatNotExists.length) {
      throw new AppError(
        `Produto do Código ${productsThatNotExists[0].id} não existe no sistema`,
      );
    }

    const notAvailableQuantityProducts = products.filter(product => {
      return (
        dbProducts.filter(dbItem => dbItem.id === product.id)[0].quantity <
        product.quantity
      );
    });
    if (notAvailableQuantityProducts.length) {
      throw new AppError(
        `Produto ${notAvailableQuantityProducts[0].id} com estoque insuficiente`,
      );
    }

    const filledProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: dbProducts.filter(dbItem => dbItem.id === product.id)[0].price,
    }));

    console.log(filledProducts);

    const newOrder = await orderRepository.createOrder({
      customer,
      products: filledProducts,
    });

    const { orderProduct } = newOrder;
    const updateProducts = orderProduct.map(product => ({
      id: product.product_id,
      quantity:
        dbProducts.filter(dbItem => dbItem.id === product.product_id)[0]
          .quantity - product.quantity,
    }));

    await productRepository.save(updateProducts);

    return newOrder;
  }
}
