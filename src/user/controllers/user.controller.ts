import { Controller, Get } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.finAllUsers();
  }
}
