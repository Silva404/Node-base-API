import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const usersService = container.resolve(CreateUserService);

    const user = await usersService.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  }
}
