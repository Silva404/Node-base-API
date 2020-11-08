import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';
import IUsersRepository from '../repositories/IUsersRepositories';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  constructor(private usersRepository: IUsersRepository) { }

  public async execute({ user_id, avatarFileName }: Request): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error('Only authenticated users can change avatar.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await this.usersRepository.save(user);
  }
}

export default UpdateUserAvatarService;
