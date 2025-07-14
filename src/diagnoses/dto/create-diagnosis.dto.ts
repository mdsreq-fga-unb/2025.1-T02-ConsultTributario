import { IsNotEmpty, IsString, IsArray, IsEnum, ValidateNested, IsMongoId, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { AnswerType } from '../schema/diagnosis.schema';

export class QuestionResponseDto {
  @IsMongoId()
  @IsNotEmpty()
  questionId: string;

  @IsEnum(AnswerType)
  @IsNotEmpty()
  answer: AnswerType;
}

export class CreateDiagnosisDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  clientName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionResponseDto)
  questionResponses: QuestionResponseDto[];
}
