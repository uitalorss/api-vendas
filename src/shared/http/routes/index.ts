import { customerRoutes } from '@modules/customers/routes/customer.routes';
import { productsRouter } from '@modules/products/Routes/products.routes';
import { passwordRoutes } from '@modules/users/routes/password.routes';
import { sessionRoutes } from '@modules/users/routes/session.routes';
import { userRoutes } from '@modules/users/routes/users.routes';
import { Router } from 'express';

export const router = Router();
router.use('/products', productsRouter);
router.use('/session', sessionRoutes);
router.use('/users', userRoutes);
router.use('/password', passwordRoutes);
router.use('/customer', customerRoutes);
