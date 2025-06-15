import { BadRequestException, Injectable } from '@nestjs/common';
import { ITaxTypesService } from '@/shared/interfaces/tax-types.interface';
import { TaxType } from './schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaxTypeDto } from './dto/create-tax-type.dto';
import { ERROR_MESSAGES } from '@/common/constants/app.constants';

@Injectable()
export class TaxTypesService implements ITaxTypesService {
  constructor(@InjectModel(TaxType.name) private readonly taxTypeModel: Model<TaxType>) {}

  async findAll(): Promise<TaxType[]> {
    return this.taxTypeModel.find().exec();
  }

  async findByName(name: string): Promise<TaxType | null> {
    return this.taxTypeModel.findOne({ name }).exec();
  }

  async create(createTaxTypeDto: CreateTaxTypeDto): Promise<TaxType> {
    const existingTaxType = await this.findByName(createTaxTypeDto.name);
    if (existingTaxType) {
      throw new BadRequestException(ERROR_MESSAGES.TAX_TYPE_NAME_EXISTS);
    }

    return this.taxTypeModel.create(createTaxTypeDto);
  }
}
