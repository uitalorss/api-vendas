import { EntityRepository, Repository, getRepository } from 'typeorm';
import { User } from '../entities/User';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';

@EntityRepository(User)
export class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async find() {
    const users = await this.ormRepository.find();
    return users;
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        name: name,
      },
    });
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }

  public async findById(id: string) {
    const user = await this.ormRepository.findOne({
      where: {
        id: id,
      },
    });
    return user;
  }

  public async create({ name, email, password }: ICreateUser) {
    const user = this.ormRepository.create({
      name,
      email,
      password,
    });
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User) {
    await this.ormRepository.save(user);
    return user;
  }

  public async remove(user: User) {
    await this.ormRepository.remove(user);
    return user;
  }
}
