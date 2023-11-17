import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import { Product } from '../typeorm/entities/Product';
import { RedisCache } from '@shared/cache/RedisCache';

export class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>('products_api-vendas');

    if (!products) {
      products = await productRepository.find();
      await redisCache.save('products_api-vendas', products);
    }

    return products;
  }
}
