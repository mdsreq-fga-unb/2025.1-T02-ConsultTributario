import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.schema';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
