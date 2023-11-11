import { Router } from 'express';
import { CustomerController } from '../controllers/CustomerController';
import { Joi, Segments, celebrate } from 'celebrate';

export const customerRoutes = Router();
const customerController = new CustomerController();

customerRoutes.get('/list', customerController.listCustomers);
customerRoutes.get('/show/:id', customerController.getCustomer);
customerRoutes.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo não pode ficar vazio',
      }),
      email: Joi.string().email().messages({
        'any.required': 'O campo email é obrigatório',
        'string.email': 'Informe um email válido',
        'string.empty': 'O campo não pode ficar vazio',
      }),
    },
  }),
  customerController.createCustomer,
);
customerRoutes.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo não pode ficar vazio',
      }),
      email: Joi.string().email().messages({
        'any.required': 'O campo email é obrigatório',
        'string.email': 'Informe um email válido',
        'string.empty': 'O campo não pode ficar vazio',
      }),
    },
  }),
  customerController.updateCustomer,
);
customerRoutes.delete('/delete/:id', customerController.deleteCustomer);
