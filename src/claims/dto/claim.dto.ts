import { Expose, Transform, Type } from 'class-transformer';
import { Question } from 'src/questions/schemas/question.schema';

export class RelatedQuestionDto {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id: string;

  @Expose()
  label: string;
}

export class ClaimDto {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id: string;

  @Expose()
  title: string;

  @Expose()
  objective: string;

  @Expose()
  summary: string;

  @Expose()
  recoverable_period: string;

  @Expose()
  recoverable_value: string;

  @Expose()
  @Type(() => RelatedQuestionDto)
  relatedQuestion: RelatedQuestionDto;
}
