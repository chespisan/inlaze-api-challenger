import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from 'src/user/infrastructure/services/user.service';
import { UserRepository } from '../../domain/user.repository';
import { UserEntity } from 'src/user/domain';

@Controller('user')
export class UserController implements UserRepository {
  constructor(private userService: UserService) {}

  @Get()
  getAll(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }

  @Get(':email')
  getOneByEmail(email: string): Promise<UserEntity> {
    return this.userService.getOneByEmail(email);
  }

  @Post()
  async createUser(@Body() user: UserEntity): Promise<UserEntity> {
    return this.userService.createUser(user);
  }
}
