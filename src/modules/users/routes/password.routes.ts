import { Router } from 'express';
import { ForgotPasswordController } from '../controllers/ForgotPasswordController';
import { Joi, Segments, celebrate } from 'celebrate';
import { ResetPasswordController } from '../controllers/ResetPasswordController';

export const passwordRoutes = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório',
        'string.email': 'Informe um email válido',
        'string.empty': 'O campo não pode ficar vazio',
      }),
    },
  }),
  forgotPasswordController.createToken,
);

passwordRoutes.patch(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required().messages({
        'any.required': 'O campo token é obrigatório',
        'string.guid': 'Informe um token válido',
        'string.empty': 'O campo não pode ficar vazio',
      }),
      password: Joi.string().required().min(5).max(20).messages({
        'any.required': 'O campo senha é obrigatório',
        'string.min': 'Informe uma senha maior que 5 caracteres',
        'string.max': 'Informe uma senha menor que 20 caracteres',
        'string.empty': 'O campo não pode ficar vazio',
      }),
      password_confirm: Joi.string()
        .required()
        .valid(Joi.ref('password'))
        .messages({
          'any.required': 'O campo senha é obrigatório',
          'any.only': 'Os campos de senha não coincidem',
        }),
    },
  }),
  resetPasswordController.updatePassword,
);
