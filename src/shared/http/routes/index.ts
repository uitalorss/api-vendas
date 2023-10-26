import { productsRouter } from '@modules/products/Routes/products.routes';
import { Router } from 'express';

export const router = Router();
router.use('/products', productsRouter);
