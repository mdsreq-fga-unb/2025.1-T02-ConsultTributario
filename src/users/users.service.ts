import { Injectable, ConflictException, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(userData: { email: string; password: string; name: string }): Promise<UserDocument> {
    try {
      this.logger.debug(`Checking for existing user with email: ${userData.email}`);
      const existingUser = await this.userModel.findOne({ email: userData.email }).exec();
      
      if (existingUser) {
        this.logger.debug('User already exists');
        throw new ConflictException('Email already exists');
      }

      this.logger.debug('Creating new user');
      this.logger.debug(`Password being saved: ${userData.password}`);
      const createdUser = new this.userModel({
        email: userData.email,
        password: userData.password,
        name: userData.name,
      });

      const savedUser = await createdUser.save();
      this.logger.debug(`User saved successfully: ${JSON.stringify(savedUser)}`);
      return savedUser;
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`);
      throw error;
    }
  }
  
  async findByEmail(email: string): Promise<UserDocument | null> {
    this.logger.debug(`Finding user by email: ${email}`);
    const user = await this.userModel.findOne({ email }).exec();
    this.logger.debug(`User found: ${JSON.stringify(user)}`);
    return user;
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }
} 