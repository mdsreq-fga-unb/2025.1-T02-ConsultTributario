import { CreateUserDto } from '@/auth/dto/auth.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
