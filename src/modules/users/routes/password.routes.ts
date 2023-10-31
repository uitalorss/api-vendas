import { Router } from 'express';
import { ForgotPasswordController } from '../controllers/ForgotPasswordController';
import { Joi, Segments, celebrate } from 'celebrate';

export const passwordRoutes = Router();
const forgotPasswordController = new ForgotPasswordController();

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
