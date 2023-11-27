import { MockCustomerRepository } from '@modules/customers/domain/repositories/mocks/MockCustomerRepository';
import { MockOrderRepository } from '../domain/repositories/mocks/MockOrderRepository';
import { MockProductRepository } from '@modules/products/domain/repositories/mocks/MockProductRepository';
import { CreateCustomerService } from '@modules/customers/services/CreateCustomerService';
import { CreateProductService } from '@modules/products/services/CreateProductService';
import { CreateOrderService } from './CreateOrderService';
import { Order } from '../infra/typeorm/entities/Order';
import { AppError } from '@shared/errors/AppError';

let mockOrderRepository: MockOrderRepository;
let mockCustomerRepository: MockCustomerRepository;
let mockProductRepository: MockProductRepository;

let createCustomerService: CreateCustomerService;
let createProductService: CreateProductService;
let createOrderSerivce: CreateOrderService;

describe('create order', () => {
  beforeEach(() => {
    mockOrderRepository = new MockOrderRepository();
    mockCustomerRepository = new MockCustomerRepository();
    mockProductRepository = new MockProductRepository();

    createCustomerService = new CreateCustomerService(mockCustomerRepository);
    createProductService = new CreateProductService(mockProductRepository);
    createOrderSerivce = new CreateOrderService(
      mockOrderRepository,
      mockCustomerRepository,
      mockProductRepository,
    );
  });
  test('should be able to create an order', async () => {
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
    expect(order).toBeInstanceOf(Order);
  });
  test('Should not be able to create an order if customer not exists', async () => {
    expect(
      createOrderSerivce.execute({
        customer_id: '6757e5ce-a560-4f07-9893-9ba7e232f59c',
        products: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  test('Should not be able to create an order if any product not exists', async () => {
    const customer = await createCustomerService.execute({
      name: 'teste',
      email: 'teste@teste.com',
    });

    const list = [];

    const item = {
      id: '6757e5ce-a560-4f07-9893-9ba7e232f59c',
      quantity: 1,
      price: 1,
    };

    list.push(item);

    expect(
      createOrderSerivce.execute({
        customer_id: customer.id,
        products: list,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  test('should not be able to create an order if some of products not exists', async () => {
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
      id: '6757e5ce-a560-4f07-9893-9ba7e232f59c',
      quantity: 1,
      price: 1,
    };

    const item2 = {
      id: product.id,
      quantity: 1,
      price: 1,
    };

    list.push(item);
    list.push(item2);

    expect(
      createOrderSerivce.execute({
        customer_id: customer.id,
        products: list,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  test("should not be able to create an order if some product don't have quantity enough to supply this one.", async () => {
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
      quantity: 10,
      price: product.price,
    };

    list.push(item);

    expect(
      createOrderSerivce.execute({
        customer_id: customer.id,
        products: list,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
