import { Request, Response } from 'express';
import { ResetPasswordService } from '../services/ResetPasswordService';

export class ResetPasswordController {
  public async updatePassword(req: Request, res: Response): Promise<Response> {
    const { password, token } = req.body;
    const resetPasswordService = new ResetPasswordService();
    await resetPasswordService.execute({ password, token });
    return res.status(204).send();
  }
}
