import { Request, Response } from 'express';
import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService';

export class AvatarController {
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
}
