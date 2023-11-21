import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
  ) {}
  public async execute() {
    const users = await this.userRepository.find();
    return users;
  }
}
