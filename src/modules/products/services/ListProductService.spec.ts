import { MockProductRepository } from '../domain/repositories/mocks/MockProductRepository';
import { Product } from '../infra/typeorm/entities/Product';
import { CreateProductService } from './CreateProductService';
import { ListProductsService } from './ListProductsService';

describe('List products', () => {
  test('should be able to list all products', async () => {
    const mockProductRepository = new MockProductRepository();
    const createProductService = new CreateProductService(
      mockProductRepository,
    );
    const listProductsService = new ListProductsService(mockProductRepository);

    await createProductService.execute({
      name: 'produto teste',
      price: 1,
      quantity: 1,
    });
    const products = await listProductsService.execute();
    expect(products).toBeInstanceOf(Array<Product>);
  });
});
