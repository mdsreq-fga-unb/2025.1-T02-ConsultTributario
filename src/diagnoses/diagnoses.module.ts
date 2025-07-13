import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DiagnosesService } from './diagnoses.service';
import { DiagnosesController } from './diagnoses.controller';
import { QuestionsModule } from '@/questions/questions.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Diagnosis, DiagnosisSchema } from './schema/diagnosis.schema';
import { ClaimsModule } from '@/claims/claims.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Diagnosis.name, schema: DiagnosisSchema }]),
    QuestionsModule,
    ClaimsModule,
    HttpModule,
  ],
  controllers: [DiagnosesController],
  providers: [DiagnosesService],
  exports: [DiagnosesService],
})
export class DiagnosesModule {}
