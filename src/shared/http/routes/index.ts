import { productsRouter } from '@modules/products/Routes/products.routes';
import { userRoutes } from '@modules/users/routes/users.routes';
import { Router } from 'express';

export const router = Router();
router.use('/products', productsRouter);
router.use('/users', userRoutes);
