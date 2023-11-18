import { Request, Response } from 'express';
import { SendForgotPasswordEmailService } from '../services/SendForgotPasswordEmailService';

export class ForgotPasswordController {
  public async createToken(req: Request, res: Response) {
    const { email } = req.body;
    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService();
    await sendForgotPasswordEmailService.execute({ email });
    return res.status(204).send();
  }
}
