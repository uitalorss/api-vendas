import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { RedisCache } from '@shared/cache/RedisCache';
import { ProductRepository } from '../infra/typeorm/repositories/ProductRepository';
import { Product } from '../infra/typeorm/entities/Product';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();

    const isProductExists = await productRepository.findByName(name);
    if (isProductExists) {
      throw new AppError('Já existe um produto com esse mesmo nome.');
    }
    const product = productRepository.create({
      name,
      quantity,
      price,
    });

    await redisCache.invalidate('products_api-vendas');
    await productRepository.save(product);
    return product;
  }
}
