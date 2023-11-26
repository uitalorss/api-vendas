import { SendForgotPasswordEmailService } from '@modules/users/services/SendForgotPasswordEmailService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ForgotPasswordController {
  public async createToken(req: Request, res: Response) {
    const { email } = req.body;
    const sendForgotPasswordEmailService = container.resolve(
      SendForgotPasswordEmailService,
    );
    await sendForgotPasswordEmailService.execute({ email });
    return res.status(204).send();
  }
}
