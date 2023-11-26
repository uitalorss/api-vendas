import { AppError } from '@shared/errors/AppError';
import { Product } from '../infra/typeorm/entities/Product';
import { ProductRepository } from '../infra/typeorm/repositories/ProductRepository';
import { IShowProduct } from '../domain/models/IShowProduct';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ShowProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: ProductRepository,
  ) {}
  public async execute({ id }: IShowProduct): Promise<Product | undefined> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }
    return product;
  }
}
