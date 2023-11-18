import { Request, Response } from 'express';
import { ListProductService } from '../services/ListProductService';
import { ShowProductService } from '../services/ShowProductService';
import { CreateProductService } from '../services/CreateProductService';
import { UpdateProductService } from '../services/UpdateProductService';
import { DeleteProductService } from '../services/DeleteProductService';

export class ProductController {
  public async listProducts(req: Request, res: Response) {
    const ListProducts = new ListProductService();
    const products = await ListProducts.execute();

    return res.status(200).json(products);
  }

  public async showProduct(req: Request, res: Response) {
    const { id } = req.params;
    console.log;
    const showProduct = new ShowProductService();
    const product = await showProduct.execute({ id });

    return res.status(200).json(product);
  }

  public async createProduct(req: Request, res: Response) {
    const { name, price, quantity } = req.body;
    const createProduct = new CreateProductService();
    const product = await createProduct.execute({ name, price, quantity });
    return res.status(201).json(product);
  }

  public async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    const updateProduct = new UpdateProductService();
    await updateProduct.execute({ id, name, quantity, price });
    return res.status(204).send();
  }

  public async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    const deleteProduct = new DeleteProductService();
    await deleteProduct.execute({ id });
    return res.status(204).send();
  }
}
