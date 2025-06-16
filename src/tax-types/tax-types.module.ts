import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaxType, TaxTypeSchema } from './schemas/category.schema';
import { TaxTypesController } from './tax-types.controller';
import { TaxTypesService } from './tax-types.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: TaxType.name, schema: TaxTypeSchema }])],
  controllers: [TaxTypesController],
  providers: [TaxTypesService],
  exports: [TaxTypesService],
})
export class TaxTypesModule {}
