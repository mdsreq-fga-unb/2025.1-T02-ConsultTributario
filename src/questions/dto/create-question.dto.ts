import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Question } from '../entities/question.entity';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString({ each: true })
  relatedQuestions: String[];
}
