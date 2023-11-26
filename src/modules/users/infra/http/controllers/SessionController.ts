import { CreateSessionService } from '@modules/users/services/CreateSessionService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class SessionController {
  async createSession(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const createSessionService = container.resolve(CreateSessionService);
    const userAuthenticated = await createSessionService.execute({
      email,
      password,
    });

    return res.status(201).send(userAuthenticated);
  }
}
