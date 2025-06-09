import { IsNotEmpty, IsString, IsArray, IsEnum, ValidateNested, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
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
  clientName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionResponseDto)
  questionResponses: QuestionResponseDto[];
}
