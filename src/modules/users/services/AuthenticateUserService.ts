import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AuthConfig from '@config/auth';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepositories';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class AuthenticateUserService {
  constructor(private usersRepository: IUsersRepository) { }

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    const { secret, expiresIn } = AuthConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}
