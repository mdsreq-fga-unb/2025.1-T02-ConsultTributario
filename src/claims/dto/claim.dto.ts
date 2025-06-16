import { BaseEntityDto, BaseTimestampDto } from '@/shared/dtos/base.dto';
import { MinimalTaxTypeDto } from '@/tax-types/dto/tax-type.dto';
import { Expose, Type } from 'class-transformer';

export class RelatedQuestionDto extends BaseEntityDto {
  @Expose()
  label: string;

  @Expose()
  isActive: boolean;
}

export class ClaimDto extends BaseTimestampDto {
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
  @Type(() => MinimalTaxTypeDto)
  taxType: MinimalTaxTypeDto;

  @Expose()
  @Type(() => RelatedQuestionDto)
  relatedQuestion: RelatedQuestionDto;
}
