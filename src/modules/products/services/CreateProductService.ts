import { AppError } from '@shared/errors/AppError';
import redisCache from '@shared/cache/RedisCache';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';

@injectable()
export class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}
  public async execute({ name, price, quantity }: ICreateProduct) {
    const isProductExists = await this.productRepository.findByName(name);
    if (isProductExists) {
      throw new AppError('Já existe um produto com esse mesmo nome.');
    }
    const product = this.productRepository.create({
      name,
      quantity,
      price,
    });

    //await redisCache.invalidate('products_api-vendas');
    return product;
  }
}
