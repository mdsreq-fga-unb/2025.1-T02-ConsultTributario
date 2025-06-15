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

  async findById(id: string): Promise<TaxType> {
    const taxType = await this.taxTypeModel.findById(id).exec();
    if (!taxType) {
      throw new BadRequestException(ERROR_MESSAGES.ENTITY_NOT_FOUND);
    }

    return taxType;
  }

  async findByName(name: string): Promise<TaxType> {
    const taxType = await this.taxTypeModel.findOne({ name }).exec();
    if (!taxType) {
      throw new BadRequestException(ERROR_MESSAGES.ENTITY_NOT_FOUND);
    }

    return taxType;
  }

  async create(createTaxTypeDto: CreateTaxTypeDto): Promise<TaxType> {
    const existingTaxType = await this.findByName(createTaxTypeDto.name);
    if (existingTaxType) {
      throw new BadRequestException(ERROR_MESSAGES.TAX_TYPE_NAME_EXISTS);
    }

    return this.taxTypeModel.create(createTaxTypeDto);
  }
}
