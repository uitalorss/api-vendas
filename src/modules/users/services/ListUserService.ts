import { IUserRepository } from '../domain/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}
  public async execute() {
    const users = await this.userRepository.find();
    return users;
  }
}
