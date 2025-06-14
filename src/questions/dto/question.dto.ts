import { BaseEntityDto, BaseTimestampDto } from '@/shared/dtos/base.dto';
import { Expose, Transform, Type } from 'class-transformer';

export class RelatedQuestionDto extends BaseEntityDto {
  @Expose()
  label: string;
}

export class QuestionDto extends BaseTimestampDto {
  @Expose()
  label: string;

  @Expose()
  tooltip: string;

  @Expose()
  isActive: boolean;

  @Expose()
  @Type(() => RelatedQuestionDto)
  relatedQuestions: RelatedQuestionDto[];
}
