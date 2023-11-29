import { ICreateProduct } from '../models/ICreateProduct';
import { IFindProducts } from '../models/IFindProducts';
import { IProduct } from '../models/IProduct';
import { IUpdateStockProducts } from '../models/IUpdateStockProducts';

export interface IProductRepository {
  findByName(name: string): Promise<IProduct | null>;
  findById(id: string): Promise<IProduct | null>;
  findProducts(products: IFindProducts[]): Promise<IProduct[]>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  updateStockProducts(products: IUpdateStockProducts[]): Promise<void>;
  remove(product: IProduct): Promise<IProduct>;
  find(): Promise<IProduct[]>;
}
