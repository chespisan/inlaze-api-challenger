import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { UserEntity, UserRepository } from 'src/user/domain';
import { CreateUserDto } from '../dtos/createUser.dto';

@Injectable()
export class UserService implements UserRepository {
  @InjectModel(User.name) private userModel: Model<User>;

  async getAll(): Promise<UserEntity[]> {
    const users: any = await this.userModel.find().exec();
    return users;
  }

  async getOneByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.userModel.findOne({ email: email });
      return user;
    } catch (error) {
      throw new BadRequestException('Email not found');
    }
  }

  async createUser(user: CreateUserDto): Promise<any> {
    try {
      const newUserModel = new this.userModel(user);
      const hasPassword = await bcrypt.hash(newUserModel.password, 10);
      newUserModel.password = hasPassword;
      const saveModel = await newUserModel.save();
      const { password, ...allData } = saveModel.toJSON();
      return allData;
    } catch (error) {
      console.log('error: ', error);
      throw new BadRequestException('User not created: ');
    }
  }
}
