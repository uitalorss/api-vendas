import { productsRouter } from '@modules/products/Routes/products.routes';
import { sessionRoutes } from '@modules/users/routes/session.routes';
import { userRoutes } from '@modules/users/routes/users.routes';
import { Router } from 'express';

export const router = Router();
router.use('/products', productsRouter);
router.use('/session', sessionRoutes);
router.use('/users', userRoutes);
