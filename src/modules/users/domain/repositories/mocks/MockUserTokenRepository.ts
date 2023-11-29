import { UserToken } from '@modules/users/infra/typeorm/entities/UserToken';
import { IUserToken } from '../../models/IUserToken';
import { IUserTokenRepository } from '../IUserTokenRepository';
import { v4 as uuidv4 } from 'uuid';

export class MockUserTokenRepository implements IUserTokenRepository {
  private userTokens: UserToken[] = [];
  public async findByToken(token: string): Promise<IUserToken | null> {
    const userToken = this.userTokens.find(item => item.token === token);
    if (!userToken) {
      return null;
    }
    return userToken;
  }
  public async generateToken(user_id: string): Promise<IUserToken> {
    const userToken = new UserToken();
    userToken.id = uuidv4();
    userToken.token = uuidv4();
    userToken.user_id = user_id;
    if (this.userTokens.length > 0) {
      const currentDate = new Date();
      userToken.created_at = new Date(
        currentDate.setDate(currentDate.getDate() - 1),
      );
    }

    this.userTokens.push(userToken);
    return userToken;
  }
}
