import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { ICreateProduct } from '../../models/ICreateProduct';
import { IFindProducts } from '../../models/IFindProducts';
import { IProduct } from '../../models/IProduct';
import { IUpdateStockProducts } from '../../models/IUpdateStockProducts';
import { IProductRepository } from '../IProductRepository';
import { v4 as uuidv4 } from 'uuid';

export class MockProductRepository implements IProductRepository {
  private products: Product[] = [];
  public async findByName(name: string): Promise<IProduct | undefined> {
    const product = this.products.find(item => item.name === name);
    return product;
  }
  public async findById(id: string): Promise<IProduct | undefined> {
    const product = this.products.find(item => item.id === id);
    return product;
  }
  public async findProducts(products: IFindProducts[]): Promise<IProduct[]> {
    throw new Error('Method not implemented.');
  }
  public async create({
    name,
    quantity,
    price,
  }: ICreateProduct): Promise<IProduct> {
    const product = new Product();
    product.id = uuidv4();
    product.name = name;
    product.price = price;
    product.quantity = quantity;

    this.products.push(product);
    return product;
  }
  public async save(product: IProduct): Promise<IProduct> {
    const productToBeUpdated = this.products.findIndex(
      item => item.id === product.id,
    );
    return product;
  }
  public async updateStockProducts(
    products: IUpdateStockProducts[],
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async remove(product: IProduct): Promise<IProduct> {
    const productToBeRemoved = this.products.findIndex(
      item => item.id === product.id,
    );
    this.products.splice(productToBeRemoved, 1);
    return product;
  }
  public async find(): Promise<IProduct[]> {
    return this.products;
  }
}
