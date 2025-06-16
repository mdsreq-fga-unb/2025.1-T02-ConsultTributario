import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ITaxTypesService } from '@/shared/interfaces/tax-types.interface';
import { TaxType } from './schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaxTypeDto } from './dto/create-tax-type.dto';
import { ERROR_MESSAGES } from '@/common/constants/app.constants';
import { UpdateTaxTypeDto } from './dto/update-tax-type.dto';

@Injectable()
export class TaxTypesService implements ITaxTypesService {
  constructor(@InjectModel(TaxType.name) private readonly taxTypeModel: Model<TaxType>) {}

  async findAll(): Promise<TaxType[]> {
    return this.taxTypeModel.find().exec();
  }

  async findById(id: string): Promise<TaxType | null> {
    const taxType = await this.taxTypeModel.findById(id).exec();
    return taxType;
  }

  async findByName(name: string): Promise<TaxType | null> {
    const taxType = await this.taxTypeModel.findOne({ name }).exec();
    return taxType;
  }

  async create(createTaxTypeDto: CreateTaxTypeDto): Promise<TaxType> {
    const existingTaxTypeName = await this.findByName(createTaxTypeDto.name);
    if (existingTaxTypeName) {
      throw new BadRequestException(ERROR_MESSAGES.TAX_TYPE_NAME_EXISTS);
    }

    return this.taxTypeModel.create(createTaxTypeDto);
  }

  async update(id: string, updateTaxTypeDto: UpdateTaxTypeDto): Promise<TaxType> {
    const existingTaxType = await this.findById(id);
    if (!existingTaxType) {
      throw new NotFoundException(ERROR_MESSAGES.ENTITY_NOT_FOUND);
    }

    if (updateTaxTypeDto.name) {
      const existingTaxTypeName = await this.findByName(updateTaxTypeDto.name);
      if (existingTaxTypeName) {
        throw new BadRequestException(ERROR_MESSAGES.TAX_TYPE_NAME_EXISTS);
      }
    }

    const updatedTaxType = await this.taxTypeModel.findByIdAndUpdate(id, updateTaxTypeDto, { new: true }).exec();

    if (!updatedTaxType) {
      throw new BadRequestException(ERROR_MESSAGES.ENTITY_NOT_FOUND);
    }

    return updatedTaxType;
  }
}
