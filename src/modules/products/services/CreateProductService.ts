import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import { AppError } from '@shared/errors/AppError';
import { Product } from '../typeorm/entities/Product';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const isProductExists = await productRepository.findByName(name);
    if (isProductExists) {
      throw new AppError('Já existe um produto com esse mesmo nome.');
    }
    const product = productRepository.create({
      name,
      quantity,
      price,
    });
    await productRepository.save(product);
    return product;
  }
}
