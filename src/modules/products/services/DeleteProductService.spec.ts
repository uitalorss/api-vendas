import { AppError } from '@shared/errors/AppError';
import { MockProductRepository } from '../domain/repositories/mocks/MockProductRepository';
import { CreateProductService } from './CreateProductService';
import { DeleteProductService } from './DeleteProductService';

let mockProductRepository: MockProductRepository;
let createProductService: CreateProductService;
let deleteProductService: DeleteProductService;

describe('Delete Product', () => {
  beforeEach(() => {
    mockProductRepository = new MockProductRepository();
    createProductService = new CreateProductService(mockProductRepository);
    deleteProductService = new DeleteProductService(mockProductRepository);
  });
  test('should be able to delete a product', async () => {
    const productToBeDeleted = await createProductService.execute({
      name: 'produto teste',
      price: 1,
      quantity: 1,
    });

    await expect(
      deleteProductService.execute({ id: productToBeDeleted.id }),
    ).resolves.not.toThrow();
  });
  test('should not be able to delete a product if your id not exists', () => {
    expect(
      deleteProductService.execute({
        id: 'df909bb7-3b30-4c2a-a856-1f0a850484dd',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
