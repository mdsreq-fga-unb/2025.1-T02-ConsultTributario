import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TaxTypesService } from './tax-types.service';
import { CreateTaxTypeDto } from './dto/create-tax-type.dto';
import { Serialize } from '@/common/interceptors/serialize.interceptor';
import { TaxTypeDto } from './dto/tax-type.dto';
import { MongoIdValidationPipe } from '@/common/pipes/mongo-id-validation.pipe';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { UserRole } from '@/users/schemas/user.schema';
import { Roles } from '@/auth/decorators/roles.decorator';

@Serialize(TaxTypeDto)
@Controller('tax-types')
export class TaxTypesController {
  constructor(private readonly taxTypesService: TaxTypesService) {}

  @Get()
  findAll() {
    return this.taxTypesService.findAll();
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() createTaxTypeDto: CreateTaxTypeDto) {
    return this.taxTypesService.create(createTaxTypeDto);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id', MongoIdValidationPipe) id: string, @Body() updateTaxTypeDto: CreateTaxTypeDto) {
    return this.taxTypesService.update(id, updateTaxTypeDto);
  }
}
