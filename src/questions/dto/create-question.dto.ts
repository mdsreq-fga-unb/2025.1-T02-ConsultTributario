import { IsString, IsNotEmpty, IsArray, IsMongoId } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsMongoId({ each: true })
  relatedQuestions: string[];
}
