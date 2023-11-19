import { CreateSessionService } from '@modules/users/services/CreateSessionService';
import { Request, Response } from 'express';

export class SessionController {
  async createSession(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const createSession = new CreateSessionService();
    const userAuthenticated = await createSession.execute({ email, password });

    return res.status(201).send(userAuthenticated);
  }
}
