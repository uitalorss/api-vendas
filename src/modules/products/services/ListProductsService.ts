import redisCache from '@shared/cache/RedisCache';
import { Product } from '../infra/typeorm/entities/Product';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { IProduct } from '../domain/models/IProduct';

@injectable()
export class ListProductsService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}
  public async execute() {
    let products = await redisCache.recover<IProduct[]>('products_api-vendas');

    if (!products) {
      products = await this.productRepository.find();
      await redisCache.save('products_api-vendas', products);
    }

    return products;
  }
}
