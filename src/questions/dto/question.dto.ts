import { Expose, Transform, Type } from 'class-transformer';

export class RelatedQuestionDto {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id: string;

  @Expose()
  description: string;
}

export class QuestionDto {
  @Transform(({ obj }) => obj._id.toString())
  @Expose()
  _id: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => RelatedQuestionDto)
  relatedQuestions: RelatedQuestionDto[];
}
