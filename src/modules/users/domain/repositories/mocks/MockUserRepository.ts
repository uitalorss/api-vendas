import { User } from '@modules/users/infra/typeorm/entities/User';
import { ICreateUser } from '../../models/ICreateUser';
import { IUser } from '../../models/IUser';
import { IUserRepository } from '../IUserRepository';
import { v4 as uuidv4 } from 'uuid';

export class MockUserRepository implements IUserRepository {
  private users: User[] = [];

  public async find(): Promise<IUser[]> {
    return this.users;
  }
  public async findByName(name: string): Promise<IUser | undefined> {
    const user = this.users.find(item => item.name === name);
    return user;
  }
  public async findById(id: string): Promise<IUser | undefined> {
    const user = this.users.find(item => item.id === id);
    return user;
  }
  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = this.users.find(item => item.email === email);
    return user;
  }
  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = new User();
    user.id = uuidv4();
    user.name = name;
    user.email = email;
    user.password = password;

    this.users.push(user);
    return user;
  }
  public async save(user: User): Promise<IUser> {
    const findUser = this.users.findIndex(item => item.id === user.id);
    this.users[findUser] = user;
    return user;
  }

  public async remove(user: User): Promise<IUser> {
    const userToBeRemoved = this.users.findIndex(item => item.id === user.id);
    this.users.splice(userToBeRemoved, 1);
    return user;
  }
}
