import { IUserToken } from '../modules/IUserToken';

export interface IUserTokenRepository {
  findByToken(token: string): Promise<IUserToken | undefined>;
  generateToken(user_id: string): Promise<IUserToken>;
}
