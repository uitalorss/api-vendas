import { EntityRepository, In, Repository } from 'typeorm';
import { Product } from '../entities/Product';

interface IFindProducts {
  id: string;
}

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.findOne({
      where: {
        name: name,
      },
    });
    return product;
  }

  public async findProducts(products: IFindProducts[]) {
    const idProducts = products.map(product => product.id);

    const productsInDatabase = await this.find({
      select: ['id', 'price', 'quantity'],
      where: {
        id: In(idProducts),
      },
    });

    return productsInDatabase;
  }
}
