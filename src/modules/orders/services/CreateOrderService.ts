import { getCustomRepository } from 'typeorm';

import { AppError } from '@shared/errors/AppError';
import { OrderRepository } from '../infra/typeorm/repositories/OrderRepository';
import { CustomerRepository } from '@modules/customers/infra/typeorm/repositories/CustomerRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductRepository';
import { IRequestCreateOrder } from '../domain/models/IRequestCreateOrder';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: OrderRepository,
    @inject('CustomerRepository')
    private customerRepository: CustomerRepository,
    @inject('ProductRepository')
    private productRepository: ProductRepository,
  ) {}
  public async execute({ customer_id, products }: IRequestCreateOrder) {
    const customer = await this.customerRepository.findById(customer_id);
    if (!customer) {
      throw new AppError('Cliente não encontrado', 404);
    }

    const dbProducts = await this.productRepository.findProducts(products);

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

    const newOrder = await this.orderRepository.create({
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

    await this.productRepository.updateStockProducts(updateProducts);

    return newOrder;
  }
}
