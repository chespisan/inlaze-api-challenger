import { Inject, Injectable } from '@nestjs/common';

import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async finAllUsers() {
    const user = await this.userModel.find().exec();
    console.log('user: ', user);
  }
}
