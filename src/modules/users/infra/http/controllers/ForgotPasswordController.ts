import { SendForgotPasswordEmailService } from '@modules/users/services/SendForgotPasswordEmailService';
import { Request, Response } from 'express';

export class ForgotPasswordController {
  public async createToken(req: Request, res: Response) {
    const { email } = req.body;
    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService();
    await sendForgotPasswordEmailService.execute({ email });
    return res.status(204).send();
  }
}
