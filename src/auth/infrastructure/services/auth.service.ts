import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/infrastructure/services/user.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { AuthEntity, AuthRepository } from 'src/auth/domain';

@Injectable()
export class AuthService implements AuthRepository {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async isValidUser(email: string, password: string) {
    const findUser = await this.userService.getOneByEmail(email);
    if (findUser) {
      const isMatch = await bcrypt.compare(password, findUser.password);
      if (isMatch) {
        const { password, ...allData } = findUser;
        return allData;
      }
    }
    return null;
  }

  async login(user: AuthEntity) {
    const payload = { email: user.email, password: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
