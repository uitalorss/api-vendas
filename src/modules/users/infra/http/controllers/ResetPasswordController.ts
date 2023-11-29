import { Request, Response } from 'express';
import { AppError } from '@shared/errors/AppError';
import { container } from 'tsyringe';
import { ResetPasswordService } from '@modules/users/services/ResetPasswordService';

export class ResetPasswordController {
  public async updatePassword(req: Request, res: Response): Promise<Response> {
    const { token } = req.query;
    const { password } = req.body;
    if (typeof token !== 'string') {
      throw new AppError('Favor informar um token válido');
    }
    const resetPasswordService = container.resolve(ResetPasswordService);
    await resetPasswordService.execute({ password, token });
    return res.status(204).send();
  }
}
