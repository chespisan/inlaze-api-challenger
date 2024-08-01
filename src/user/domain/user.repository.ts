import { UserEntity } from 'src/user/domain';

export interface UserRepository {
  getAll(): Promise<UserEntity[]>;
  getOneByEmail(email: string): Promise<UserEntity>;
  createUser(user: UserEntity): Promise<UserEntity>;
}
