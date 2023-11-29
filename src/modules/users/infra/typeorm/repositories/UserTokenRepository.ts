import { Repository } from 'typeorm';
import { UserToken } from '../entities/UserToken';
import { dataSource } from '@shared/infra/typeorm';
import { IUserTokenRepository } from '@modules/users/domain/repositories/IUserTokenRepository';

export class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = dataSource.getRepository(UserToken);
  }

  public async findByToken(token: string) {
    const userToken = await this.ormRepository.findOneBy({ token });
    return userToken;
  }

  public async generateToken(user_id: string) {
    const userToken = this.ormRepository.create({ user_id: user_id });
    await this.ormRepository.save(userToken);
    return userToken;
  }
}
