import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import { upload } from '@config/upload';
import { UserController } from '../controllers/UserController';
import { handleAuthentication } from '@shared/infra/http/middlewares/handleAuthentication';

export const userRoutes = Router();
export const avatarRoutes = Router();
const userController = new UserController();
userRoutes.get('/', userController.listUsers);
userRoutes.get('/profile', handleAuthentication, userController.showUser);
userRoutes.put(
  '/profile',
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
      password: Joi.string().optional().min(5).max(20).messages({
        'string.min': 'Informe uma senha maior que 5 caracteres',
        'string.max': 'Informe uma senha menor que 20 caracteres',
        'string.empty': 'O campo não pode ficar vazio',
      }),
      oldPassword: Joi.string()
        .min(5)
        .max(20)
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        })
        .messages({
          'string.min': 'Informe uma senha maior que 5 caracteres',
          'string.max': 'Informe uma senha menor que 20 caracteres',
          'any.required': 'O campo senha anterior é obrigatório',
        }),
    },
  }),
  handleAuthentication,
  userController.updateUser,
);
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

userRoutes.patch(
  '/avatar',
  upload.single('image'),
  handleAuthentication,
  userController.updateAvatar,
);
