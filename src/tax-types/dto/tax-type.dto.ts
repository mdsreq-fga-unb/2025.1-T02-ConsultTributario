import { BaseTimestampDto } from '@/shared/dtos/base.dto';
import { Expose } from 'class-transformer';

export class MinimalTaxTypeDto {
  @Expose()
  name: string;
}

export class TaxTypeDto extends BaseTimestampDto {
  @Expose()
  name: string;
}
