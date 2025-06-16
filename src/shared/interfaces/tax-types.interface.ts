import { CreateTaxTypeDto } from '@/tax-types/dto/create-tax-type.dto';
import { UpdateTaxTypeDto } from '@/tax-types/dto/update-tax-type.dto';
import { TaxType } from '@/tax-types/schemas/category.schema';

export interface ITaxTypesService {
  findAll(): Promise<TaxType[]>;
  create(createTaxTypeDto: CreateTaxTypeDto): Promise<TaxType>;
  findById(id: string): Promise<TaxType | null>;
  findByName(name: string): Promise<TaxType | null>;
  update(id: string, updateTaxTypeDto: UpdateTaxTypeDto): Promise<TaxType>;
}
