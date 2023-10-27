import { Request, Response } from 'express';
import { ListUserService } from '../services/ListUserService';
import { CreateUserService } from '../services/CreateUserService';

export class UserController {
  async listUsers(req: Request, res: Response): Promise<Response> {
    const listUsers = new ListUserService();
    const users = await listUsers.execute();

    return res.status(200).json(users);
  }

  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const createUser = new CreateUserService();
    await createUser.execute({ name, email, password });

    return res.status(201).json({ message: 'Usuário criado com sucesso.' });
  }
}
