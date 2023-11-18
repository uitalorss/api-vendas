import { Request, Response } from 'express';
import { ResetPasswordService } from '../services/ResetPasswordService';
import { AppError } from '@shared/errors/AppError';

export class ResetPasswordController {
  public async updatePassword(req: Request, res: Response): Promise<Response> {
    const { token } = req.query;
    const { password } = req.body;
    if (typeof token !== 'string') {
      throw new AppError('Favor informar um token válido');
    }
    const resetPasswordService = new ResetPasswordService();
    await resetPasswordService.execute({ password, token });
    return res.status(204).send();
  }
}
