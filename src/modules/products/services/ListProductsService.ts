import redisCache from '@shared/cache/RedisCache';
import { ProductRepository } from '../infra/typeorm/repositories/ProductRepository';
import { Product } from '../infra/typeorm/entities/Product';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListProductsService {
  constructor(
    @inject('ProductRepository')
    private productRepository: ProductRepository,
  ) {}
  public async execute(): Promise<Product[]> {
    let products = await redisCache.recover<Product[]>('products_api-vendas');

    if (!products) {
      products = await this.productRepository.find();
      await redisCache.save('products_api-vendas', products);
    }

    return products;
  }
}
