import { productsRouter } from '@modules/products/Routes/products.routes';
import { sessionRoutes } from '@modules/users/routes/session.routes';
import { userRoutes } from '@modules/users/routes/users.routes';
import { Router } from 'express';

export const router = Router();
router.use('/products', productsRouter);
router.use('/users', userRoutes);
router.use('/session', sessionRoutes);
