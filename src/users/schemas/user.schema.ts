import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
    unique: true,
    maxlength: 255,
    lowercase: true,
  })
  email: string;

  @Prop({
    required: true,
    maxlength: 255,
  })
  password: string;

  @Prop({
    required: true,
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
