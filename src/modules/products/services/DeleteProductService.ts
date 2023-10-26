import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

export class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }
    await productRepository.remove(product);
  }
}
