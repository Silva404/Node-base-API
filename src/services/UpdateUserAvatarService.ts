import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import UploadConfig from '../config/upload';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  user_id: string;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const UserRepository = getRepository(User);

    const user = await UserRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only autheticated user cand change avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(UploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await UserRepository.save(user);

    return user;
  }
}
