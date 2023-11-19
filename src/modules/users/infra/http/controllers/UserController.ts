import { Request, Response } from 'express';

import { instanceToInstance } from 'class-transformer';
import { ListUserService } from '@modules/users/services/ListUserService';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { UpdateUserAvatarService } from '@modules/users/services/UpdateUserAvatarService';
import { GetUserService } from '@modules/users/services/getUserService';
import { UpdateProfileService } from '@modules/users/services/updateProfileService';

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
