import { In, Repository, getRepository } from 'typeorm';
import { Product } from '../entities/Product';
import { IFindProducts } from '@modules/products/domain/models/IFindProducts';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import { IUpdateStockProducts } from '@modules/products/domain/models/IUpdateStockProducts';
import { IProduct } from '@modules/products/domain/models/IProduct';

export class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        name: name,
      },
    });
    return product;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        id: id,
      },
    });
    return product;
  }

  public async findProducts(products: IFindProducts[]) {
    const idProducts = products.map(product => product.id);

    const productsInDatabase = await this.ormRepository.find({
      select: ['id', 'price', 'quantity'],
      where: {
        id: In(idProducts),
      },
    });

    return productsInDatabase;
  }

  public async create({ name, price, quantity }: ICreateProduct) {
    const product = this.ormRepository.create({
      name,
      quantity,
      price,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product) {
    await this.ormRepository.save(product);
    return product;
  }

  public async find(): Promise<IProduct[]> {
    return this.ormRepository.find();
  }

  public async remove(product: Product) {
    return this.ormRepository.remove(product);
  }

  public async updateStockProducts(
    products: IUpdateStockProducts[],
  ): Promise<void> {
    await this.ormRepository.save(products);
  }
}
