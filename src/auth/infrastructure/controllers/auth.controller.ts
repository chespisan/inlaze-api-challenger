import {
  Controller,
  Bind,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';

import { UserEntity } from 'src/user/domain';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../strategies/local/local-guard.strategy';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() user: UserEntity) {
    return this.authService.login(user);
  }
}
