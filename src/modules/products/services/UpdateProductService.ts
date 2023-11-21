import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { RedisCache } from '@shared/cache/RedisCache';
import { ProductRepository } from '../infra/typeorm/repositories/ProductRepository';
import { IUpdateProduct } from '../domain/modules/IUpdateProduct';

export class UpdateProductService {
  public async execute({ id, name, quantity, price }: IUpdateProduct) {
    const productRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();

    const product = await productRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }

    const isProductExists = await productRepository.findByName(name);
    if (isProductExists && name !== product.name) {
      throw new AppError('Já existe um produto com esse mesmo nome.');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await redisCache.invalidate('products_api-vendas');
    await productRepository.save(product);
    return product;
  }
}
