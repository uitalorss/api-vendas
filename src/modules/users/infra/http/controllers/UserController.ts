import { Request, Response } from 'express';
import { ListUserService } from '../services/ListUserService';
import { CreateUserService } from '../services/CreateUserService';
import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService';
import { GetUserService } from '../services/getUserService';
import { UpdateProfileService } from '../services/updateProfileService';
import { instanceToInstance } from 'class-transformer';

export class UserController {
  async listUsers(req: Request, res: Response): Promise<Response> {
    const listUsers = new ListUserService();
    const users = await listUsers.execute();

    return res.status(200).json(instanceToInstance(users));
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const createUser = new CreateUserService();
    await createUser.execute({ name, email, password });

    return res.status(201).json({ message: 'Usuário criado com sucesso.' });
  }

  async updateAvatar(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const image = req.file!.filename;
    const updateAvatar = new UpdateUserAvatarService();

    await updateAvatar.execute({
      userId: id,
      avatarFileName: image,
    });
    return res.status(204).send();
  }

  async getUser(req: Request, res: Response) {
    const { id } = req.user;
    const getUserService = new GetUserService();
    const user = await getUserService.execute({ userId: id });
    return res.status(200).json(instanceToInstance(user));
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.user;
    const { name, email, password, oldPassword } = req.body;
    const updateProfileService = new UpdateProfileService();
    await updateProfileService.execute({
      userId: id,
      name,
      email,
      password,
      oldPassword,
    });
    return res.status(204).send();
  }
}