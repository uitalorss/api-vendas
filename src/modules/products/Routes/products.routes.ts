import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

export const productsRouter = Router();
const productsController = new ProductController();

productsRouter.get('/', productsController.listProducts);
productsRouter.get('/:id', productsController.showProduct);
productsRouter.post('/', productsController.createProduct);
productsRouter.put('/:id', productsController.updateProduct);
productsRouter.delete('/:id', productsController.deleteProduct);
