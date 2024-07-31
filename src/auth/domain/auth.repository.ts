import { AuthEntity } from 'src/auth/domain';

export interface AuthRepository {
  login(user: AuthEntity): any;
}
