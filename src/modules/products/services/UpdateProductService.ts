import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export class UpdateProductService {
  public async execute(
    id: string,
    name: string,
    quantity: number,
    price: number,
  ) {
    const productRepository = getCustomRepository(ProductRepository);

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

    await productRepository.save(product);
    return product;
  }
}
