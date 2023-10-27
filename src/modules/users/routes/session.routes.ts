import { Router } from 'express';
import { SessionController } from '../controllers/SessionController';
import { Joi, Segments, celebrate } from 'celebrate';
import { handleAuthentication } from '@shared/http/middlewares/handleAuthentication';

export const sessionRoutes = Router();
const sessionController = new SessionController();

sessionRoutes.post(
  '/login',
  celebrate({
    [Segments.BODY]: {
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
  sessionController.createSession,
);

sessionRoutes.get('/', handleAuthentication, (req, res) => {
  return res.send();
});
