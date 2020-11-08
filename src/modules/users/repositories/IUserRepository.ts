import ICreateUserDTO from '../dto/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}
