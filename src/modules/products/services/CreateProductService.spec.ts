import { AppError } from '@shared/errors/AppError';
import { MockProductRepository } from '../domain/repositories/mocks/MockProductRepository';
import { CreateProductService } from './CreateProductService';

let mockProductRepository: MockProductRepository;
let createProductService: CreateProductService;

describe('Create Product', () => {
  beforeEach(() => {
    mockProductRepository = new MockProductRepository();
    createProductService = new CreateProductService(mockProductRepository);
  });
  test('should be able to create a product', async () => {
    const product = await createProductService.execute({
      name: 'produto teste',
      price: 1,
      quantity: 1,
    });
    expect(product).toHaveProperty('id');
  });

  test('should not be able to create a Product if your name already exists in database', async () => {
    await createProductService.execute({
      name: 'produto teste',
      price: 1,
      quantity: 1,
    });

    expect(
      createProductService.execute({
        name: 'produto teste',
        price: 1,
        quantity: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
