import { Expose, Transform, Type } from 'class-transformer';
import { AnswerType } from '../schema/diagnosis.schema';
import { BaseTimestampDto } from '@/shared/dtos/base.dto';

export class QuestionResponseDto {
  @Expose()
  @Transform(({ obj }) => obj.questionId.toString())
  questionId: string;

  @Expose()
  answer: AnswerType;
}

export class DiagnosisDto extends BaseTimestampDto {
  @Expose()
  clientName: string;

  @Expose()
  @Type(() => QuestionResponseDto)
  questionResponses: QuestionResponseDto[];
}

export class DiagnosisDtoWithoutQuestionResponses extends BaseTimestampDto {
  @Expose()
  clientName: string;
}
