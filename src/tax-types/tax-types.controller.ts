import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaxTypesService } from './tax-types.service';
import { CreateTaxTypeDto } from './dto/create-tax-type.dto';
import { Serialize } from '@/common/interceptors/serialize.interceptor';
import { TaxTypeDto } from './dto/tax-type.dto';

@Serialize(TaxTypeDto)
@Controller('tax-types')
export class TaxTypesController {
  constructor(private readonly taxTypesService: TaxTypesService) {}

  @Get()
  findAll() {
    return this.taxTypesService.findAll();
  }

  @Post()
  create(@Body() createTaxTypeDto: CreateTaxTypeDto) {
    return this.taxTypesService.create(createTaxTypeDto);
  }
}
