import { ICreateUser } from '../modules/ICreateUser';
import { IUser } from '../modules/IUser';

export interface IUserRepository {
  find(): Promise<IUser[]>;
  findByName(name: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  create(data: ICreateUser): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
}
