import { AppError } from '@shared/errors/AppError';
import { MockProductRepository } from '../domain/repositories/mocks/MockProductRepository';
import { Product } from '../infra/typeorm/entities/Product';
import { CreateProductService } from './CreateProductService';
import { UpdateProductService } from './UpdateProductService';

let mockProductRepository: MockProductRepository;
let createProductService: CreateProductService;
let updateProductService: UpdateProductService;

describe('Update product', () => {
  beforeEach(() => {
    mockProductRepository = new MockProductRepository();
    createProductService = new CreateProductService(mockProductRepository);
    updateProductService = new UpdateProductService(mockProductRepository);
  });

  test('should be able to receive and update a product', async () => {
    const product = await createProductService.execute({
      name: 'produto teste',
      price: 1,
      quantity: 1,
    });
    const productToBeUpdated = await updateProductService.execute({
      id: product.id,
      name: 'teste 2',
      price: 2,
      quantity: 2,
    });
    expect(productToBeUpdated).toBeInstanceOf(Product);
  });
  test('should not be able to update a product if your id not exists', async () => {
    expect(
      updateProductService.execute({
        id: 'df909bb7-3b30-4c2a-a856-1f0a850484dd',
        name: 'teste 2',
        price: 2,
        quantity: 2,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  test("should not be able to update a product if your name already exists and don't belong to product to want to update,", async () => {
    const product = await createProductService.execute({
      name: 'produto teste',
      price: 1,
      quantity: 1,
    });

    const productToBeUpdated = await createProductService.execute({
      name: 'teste 2',
      price: 2,
      quantity: 2,
    });
    expect(
      updateProductService.execute({
        id: productToBeUpdated.id,
        name: 'produto teste',
        price: 2,
        quantity: 2,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
