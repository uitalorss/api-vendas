import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { celebrate, Joi, Segments } from 'celebrate';

export const productsRouter = Router();
const productsController = new ProductController();

productsRouter.get('/', productsController.listProducts);
productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required().messages({
        'string.guid': 'Informe um valor de identificador válido',
      }),
    },
  }),
  productsController.showProduct,
);
productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().messages({}),
      price: Joi.number().required().messages({}),
      quantity: Joi.number().required().messages({}),
    },
  }),
  productsController.createProduct,
);
productsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().messages({}),
      price: Joi.number().required().precision(2).messages({}),
      quantity: Joi.number().required().messages({}),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required().messages({
        'string.guid': 'Informe um valor de identificador válido',
      }),
    },
  }),
  productsController.updateProduct,
);
productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required().messages({
        'string.guid': 'Informe um valor de identificador válido',
      }),
    },
  }),
  productsController.deleteProduct,
);
