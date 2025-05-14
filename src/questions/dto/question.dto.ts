import { Expose, Type } from 'class-transformer';
import { Question } from '../schemas/question.schema';

export class RelatedQuestionDto {
  @Expose()
  _id: string;

  @Expose()
  description: string;
}

export class QuestionDto {
  @Expose()
  _id: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => RelatedQuestionDto)
  relatedQuestions: RelatedQuestionDto[];
}
