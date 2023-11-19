import { getCustomRepository } from 'typeorm';

import { RedisCache } from '@shared/cache/RedisCache';
import { ProductRepository } from '../infra/typeorm/repositories/ProductRepository';
import { Product } from '../infra/typeorm/entities/Product';

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
