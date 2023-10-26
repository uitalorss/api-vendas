import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import { Product } from '../typeorm/entities/Product';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

export class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product | undefined> {
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
