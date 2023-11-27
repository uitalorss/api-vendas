import { AppError } from '@shared/errors/AppError';
import { MockProductRepository } from '../domain/repositories/mocks/MockProductRepository';
import { Product } from '../infra/typeorm/entities/Product';
import { CreateProductService } from './CreateProductService';
import { ShowProductService } from './ShowProductService';

let mockProductRepository: MockProductRepository;
let createProductService: CreateProductService;
let showProductService: ShowProductService;

describe('Show Product', () => {
  beforeEach(() => {
    mockProductRepository = new MockProductRepository();
    createProductService = new CreateProductService(mockProductRepository);
    showProductService = new ShowProductService(mockProductRepository);
  });
  test('should be able to show a product', async () => {
    const product = await createProductService.execute({
      name: 'produto teste',
      price: 1,
      quantity: 1,
    });

    expect(await showProductService.execute({ id: product.id })).toBeInstanceOf(
      Product,
    );
  });
  test('should not be able to show a product if your id not exists', async () => {
    expect(
      showProductService.execute({
        id: 'df909bb7-3b30-4c2a-a856-1f0a850484dd',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
