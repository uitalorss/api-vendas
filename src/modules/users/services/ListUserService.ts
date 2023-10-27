import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';

export class ListUserService {
  public async execute() {
    const userRepository = getCustomRepository(UserRepository);
    const users = await userRepository.find();
    return users;
  }
}
