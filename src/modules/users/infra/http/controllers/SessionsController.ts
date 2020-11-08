import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const sessionService = container.resolve(AuthenticateUserService);

    const { user, token } = await sessionService.execute({
      email,
      password,
    });

    return response.json({ user, token });
  }
}
