import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { RedisCache } from '@shared/cache/RedisCache';
import { ProductRepository } from '../infra/typeorm/repositories/ProductRepository';

interface IRequest {
  id: string;
}

export class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
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
    await redisCache.invalidate('products_api-vendas');
    await productRepository.remove(product);
  }
}
