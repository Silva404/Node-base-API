import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    try {
      const UserRepository = getRepository(User);

      const checkUserExist = await UserRepository.findOne({
        where: { email },
      });

      if (checkUserExist) {
        throw new Error('Email already in use.');
      }

      const hashedPassword = await hash(password, 8);

      const user = await UserRepository.create({
        name,
        email,
        password: hashedPassword,
      });

      await UserRepository.save(user);

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
