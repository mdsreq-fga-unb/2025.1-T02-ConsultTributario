import { PartialType } from '@nestjs/swagger';
import { CreateQuestionDto } from './create-question.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
