import { Expose, Transform, Type } from 'class-transformer';

export class RelatedQuestionDto {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id: string;

  @Expose()
  label: string;
}

export class QuestionDto {
  @Transform(({ obj }) => obj._id.toString())
  @Expose()
  _id: string;

  @Expose()
  label: string;

  @Expose()
  tooltip: string;

  @Expose()
  @Type(() => RelatedQuestionDto)
  relatedQuestions: RelatedQuestionDto[];
}
