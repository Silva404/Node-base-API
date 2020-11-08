import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/models/IHashProvider';
import IUserRepository from '../repositories/IUserRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ name, email, password }: Request): Promise<User> {
    const checkUserExist = await this.userRepository.findByEmail(email);

    const hashedPassword = await this.hashProvider.generateHash(password);

    if (checkUserExist) {
      throw new Error('Email address already used.');
    }

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
