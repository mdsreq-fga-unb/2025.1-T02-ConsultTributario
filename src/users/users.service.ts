import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {

    try {

      const data = {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      }
  
      const newUser = new this.userModel(data);
  
      const saved = await newUser.save()
  
      const { password, ...userWithoutPassword } = saved.toObject();
  
      return userWithoutPassword;

    } catch (error) {
      if (error.code === 11000) { // Email em uso
        throw new ConflictException('This email is already in use.')
      }
      throw error;
    }
  }

  async findAll() {
    const users = await this.userModel.find().lean();
    return users.map(({ password, ...rest }) => rest);
  }

  
  findByEmail(email: string) {
    return ``;
  }


}
