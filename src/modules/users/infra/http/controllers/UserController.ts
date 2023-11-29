import { Request, Response } from 'express';

import { instanceToInstance } from 'class-transformer';
import { ListUserService } from '@modules/users/services/ListUserService';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { UpdateUserAvatarService } from '@modules/users/services/UpdateUserAvatarService';
import { ShowUserService } from '@modules/users/services/showUserService';
import { UpdateProfileService } from '@modules/users/services/updateProfileService';

import { container } from 'tsyringe';

export class UserController {
  async listUsers(req: Request, res: Response): Promise<Response> {
    const listUsersService = container.resolve(ListUserService);
    const users = await listUsersService.execute();

    return res.status(200).json(instanceToInstance(users));
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const createUserService = container.resolve(CreateUserService);
    await createUserService.execute({ name, email, password });

    return res.status(201).json({ message: 'Usuário criado com sucesso.' });
  }

  async updateAvatar(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const image = req.file!.filename;
    const updateAvatarService = container.resolve(UpdateUserAvatarService);

    await updateAvatarService.execute({
      userId: id,
      avatarFileName: image,
    });
    return res.status(204).send();
  }

  async showUser(req: Request, res: Response) {
    const { id } = req.user;
    const showUserService = container.resolve(ShowUserService);
    const user = await showUserService.execute({ userId: id });

    return res.status(200).json(instanceToInstance(user));
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.user;
    const { name, email, password, oldPassword } = req.body;
    const updateProfileService = container.resolve(UpdateProfileService);
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
