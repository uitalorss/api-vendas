import { CreateProductService } from '@modules/products/services/CreateProductService';
import { DeleteProductService } from '@modules/products/services/DeleteProductService';
import { ListProductsService } from '@modules/products/services/ListProductsService';
import { ShowProductService } from '@modules/products/services/ShowProductService';
import { UpdateProductService } from '@modules/products/services/UpdateProductService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ProductController {
  public async listProducts(req: Request, res: Response) {
    const listProductsService = container.resolve(ListProductsService);
    const products = await listProductsService.execute();

    return res.status(200).json(products);
  }

  public async showProduct(req: Request, res: Response) {
    const { id } = req.params;
    const showProductService = container.resolve(ShowProductService);
    const product = await showProductService.execute({ id });

    return res.status(200).json(product);
  }

  public async createProduct(req: Request, res: Response) {
    const { name, price, quantity } = req.body;
    const createProductService = container.resolve(CreateProductService);
    const product = await createProductService.execute({
      name,
      price,
      quantity,
    });
    return res.status(201).json(product);
  }

  public async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    const updateProductService = container.resolve(UpdateProductService);
    await updateProductService.execute({ id, name, quantity, price });
    return res.status(204).send();
  }

  public async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    const deleteProductService = container.resolve(DeleteProductService);
    await deleteProductService.execute({ id });
    return res.status(204).send();
  }
}
