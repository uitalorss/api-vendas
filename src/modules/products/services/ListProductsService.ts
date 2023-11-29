import redisCache from '@shared/cache/RedisCache';
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
    //let products = await redisCache.recover<IProduct[]>('products_api-vendas');
    const products = await this.productRepository.find();
    // if (!products) {

    //   await redisCache.save('products_api-vendas', products);
    // }

    return products;
  }
}
