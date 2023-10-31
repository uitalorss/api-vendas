import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        name: name,
      },
    });
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }

  public async findById(id: string) {
    const user = await this.findOne({
      where: {
        id: id,
      },
    });
    return user;
  }
}
