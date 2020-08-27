import { getRepository } from 'typeorm';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ email, name, password }: Request): Promise<User> {
    const UserRepository = getRepository(User);

    const checkUserExist = await UserRepository.findOne({
      where: email,
    });
    
    if (checkUserExist) {
      throw new Error('Email already in use.');
    }

    const user = await UserRepository.create({
      name,
      email,
      password,
    });

    await UserRepository.save(user);

    return user;
  }
}
