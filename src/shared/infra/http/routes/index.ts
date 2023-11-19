import { customerRoutes } from '@modules/customers/infra/http/routes/customer.routes';
import { orderRoutes } from '@modules/orders/infra/http/routes/order.routes';
import { productsRouter } from '@modules/products/infra/http/Routes/products.routes';
import { passwordRoutes } from '@modules/users/infra/http/routes/password.routes';
import { sessionRoutes } from '@modules/users/infra/http/routes/session.routes';
import { userRoutes } from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

export const router = Router();
router.use('/products', productsRouter);
router.use('/session', sessionRoutes);
router.use('/users', userRoutes);
router.use('/password', passwordRoutes);
router.use('/customer', customerRoutes);
router.use('/order', orderRoutes);
