import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { RedisCache } from '@shared/cache/RedisCache';
import { ProductRepository } from '../infra/typeorm/repositories/ProductRepository';
import { IDeleteProduct } from '../domain/models/IDeleteProduct';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}
  public async execute({ id }: IDeleteProduct) {
    const redisCache = new RedisCache();
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }
    await redisCache.invalidate('products_api-vendas');
    await this.productRepository.remove(product);
  }
}
