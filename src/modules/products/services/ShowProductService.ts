import { getCustomRepository } from 'typeorm';

import { AppError } from '@shared/errors/AppError';
import { Product } from '../infra/typeorm/entities/Product';
import { ProductRepository } from '../infra/typeorm/repositories/ProductRepository';
import { IShowProduct } from '../domain/modules/IShowProduct';

export class ShowProductService {
  public async execute({ id }: IShowProduct): Promise<Product | undefined> {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }
    return product;
  }
}
