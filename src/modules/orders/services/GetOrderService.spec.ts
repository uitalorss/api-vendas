import { MockCustomerRepository } from '@modules/customers/domain/repositories/mocks/MockCustomerRepository';
import { MockOrderRepository } from '../domain/repositories/mocks/MockOrderRepository';
import { MockProductRepository } from '@modules/products/domain/repositories/mocks/MockProductRepository';
import { CreateCustomerService } from '@modules/customers/services/CreateCustomerService';
import { CreateProductService } from '@modules/products/services/CreateProductService';
import { CreateOrderService } from './CreateOrderService';
import { GetOrderService } from './GetOrderService';
import { create } from 'domain';
import { Order } from '../infra/typeorm/entities/Order';
import { AppError } from '@shared/errors/AppError';

let mockOrderRepository: MockOrderRepository;
let mockCustomerRepository: MockCustomerRepository;
let mockProductRepository: MockProductRepository;
let createCustomerService: CreateCustomerService;
let createProductService: CreateProductService;
let createOrderSerivce: CreateOrderService;
let getOrderService: GetOrderService;

describe('Get Order', () => {
  beforeEach(() => {
    mockCustomerRepository = new MockCustomerRepository();
    mockProductRepository = new MockProductRepository();
    mockOrderRepository = new MockOrderRepository();

    createCustomerService = new CreateCustomerService(mockCustomerRepository);
    createProductService = new CreateProductService(mockProductRepository);
    createOrderSerivce = new CreateOrderService(
      mockOrderRepository,
      mockCustomerRepository,
      mockProductRepository,
    );
    getOrderService = new GetOrderService(mockOrderRepository);
  });

  test('Should be able to get an order whose id that has been passed', async () => {
    const customer = await createCustomerService.execute({
      name: 'teste',
      email: 'teste@teste.com',
    });

    const product = await createProductService.execute({
      name: 'teste',
      price: 1,
      quantity: 1,
    });

    const list = [];

    const item = {
      id: product.id,
      quantity: 1,
      price: product.quantity,
    };

    list.push(item);

    const order = await createOrderSerivce.execute({
      customer_id: customer.id,
      products: list,
    });

    const receivedOrder = await getOrderService.execute({ order_id: order.id });

    expect(receivedOrder).toBeInstanceOf(Order);
  });
  test('should not be able to get an order if id has been passed not exists in database', async () => {
    expect(
      getOrderService.execute({
        order_id: '6757e5ce-a560-4f07-9893-9ba7e232f59c',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
