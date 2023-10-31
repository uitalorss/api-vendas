import { Repository } from 'typeorm';
import { UserToken } from '../entities/UserToken';

export class UserTokenRepository extends Repository<UserToken> {
  public async findByToken(token: string) {
    const userToken = await this.findOne({
      where: {
        token: token,
      },
    });
    return userToken;
  }

  public async generateToken(user_id: string) {
    const userToken = this.create({ user_id: user_id });
    await this.save(userToken);
    return userToken;
  }
}
