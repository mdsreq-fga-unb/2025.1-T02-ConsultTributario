import { PartialType } from '@nestjs/swagger';
import { CreateTaxTypeDto } from './create-tax-type.dto';

export class UpdateTaxTypeDto extends PartialType(CreateTaxTypeDto) {}
