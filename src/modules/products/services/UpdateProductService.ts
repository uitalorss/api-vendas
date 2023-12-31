import { AppError } from '@shared/errors/AppError';
import redisCache from '@shared/cache/RedisCache';
import { IUpdateProduct } from '../domain/models/IUpdateProduct';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';

@injectable()
export class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}
  public async execute({ id, name, quantity, price }: IUpdateProduct) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }

    const isProductExists = await this.productRepository.findByName(name);
    if (isProductExists && name !== product.name) {
      throw new AppError('Já existe um produto com esse mesmo nome.');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    //await redisCache.invalidate('products_api-vendas');
    await this.productRepository.save(product);
    return product;
  }
}
