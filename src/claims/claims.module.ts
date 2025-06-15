import { Module } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { ClaimsController } from './claims.controller';
import { Claim, ClaimSchema } from './schemas/claim.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsModule } from '../questions/questions.module';
import { TaxTypesModule } from '@/tax-types/tax-types.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Claim.name, schema: ClaimSchema }]), QuestionsModule, TaxTypesModule],
  controllers: [ClaimsController],
  providers: [ClaimsService],
  exports: [ClaimsService],
})
export class ClaimsModule {}
