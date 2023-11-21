import { ICreateProduct } from '../modules/ICreateProduct';
import { IFindProducts } from '../modules/IFindProducts';
import { IProduct } from '../modules/IProduct';

export interface IProductRepository {
  findByName(name: string): Promise<IProduct | undefined>;
  findProducts(products: IFindProducts[]): Promise<IProduct[]>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  remove(product: IProduct): Promise<IProduct>;
  find(): Promise<IProduct[]>;
}
