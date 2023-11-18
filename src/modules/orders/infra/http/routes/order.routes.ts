import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';
import { handleAuthentication } from '@shared/http/middlewares/handleAuthentication';
import { Joi, Segments, celebrate } from 'celebrate';

export const orderRoutes = Router();
const orderController = new OrderController();

orderRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required().messages({
        'any.required': 'Informe um valor de identificador.',
        'string.empty': 'O campo não pode ficar vazio',
        'string.guid': 'Informe um valor de identificador válido',
      }),
      products: Joi.required().messages({
        'any.required': 'Informe os produtos selecionados.',
      }),
    },
  }),
  handleAuthentication,
  orderController.createOrder,
);
orderRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required().messages({
        'any.required': 'Informe um valor de identificador.',
        'string.empty': 'O campo não pode ficar vazio',
        'string.guid': 'Informe um valor de identificador válido',
      }),
    },
  }),
  handleAuthentication,
  orderController.getOrder,
);
