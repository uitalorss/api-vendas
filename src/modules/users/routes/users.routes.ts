import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { Joi, Segments, celebrate } from 'celebrate';

export const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/', userController.listUsers);
userRoutes.post(
  '/',
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
      password: Joi.string().required().min(5).max(20).messages({
        'any.required': 'O campo senha é obrigatório',
        'string.min': 'Informe uma senha maior que 5 caracteres',
        'string.max': 'Informe uma senha menor que 20 caracteres',
        'string.empty': 'O campo não pode ficar vazio',
      }),
    },
  }),
  userController.createUser,
);
