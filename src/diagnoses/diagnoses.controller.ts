import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DiagnosesService } from './diagnoses.service';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { MongoIdValidationPipe } from '@/common/pipes/mongo-id-validation.pipe';
import { Serialize } from '@/common/interceptors/serialize.interceptor';
import { DiagnosisDto, DiagnosisDtoWithoutQuestionResponses } from './dto/diagnosis.dto';
import { ClaimRecommendationResponseDto } from './dto/claim-recommendation.dto';

@Controller('diagnoses')
export class DiagnosesController {
  constructor(private readonly diagnosesService: DiagnosesService) {}

  @Serialize(DiagnosisDtoWithoutQuestionResponses)
  @Post()
  create(@Body() createDiagnosisDto: CreateDiagnosisDto) {
    return this.diagnosesService.create(createDiagnosisDto);
  }

  @Serialize(DiagnosisDtoWithoutQuestionResponses)
  @Get()
  findAll() {
    return this.diagnosesService.findAll();
  }

  @Serialize(DiagnosisDto)
  @Get(':id')
  findById(@Param('id', MongoIdValidationPipe) id: string) {
    return this.diagnosesService.findById(id);
  }

  @Serialize(ClaimRecommendationResponseDto)
  @Get(':id/recommendations')
  async getRecommendations(@Param('id', MongoIdValidationPipe) id: string) {
    return this.diagnosesService.getRecommendations(id);
  }

  @Delete(':id')
  async delete(@Param('id', MongoIdValidationPipe) id: string) {
    return this.diagnosesService.delete(id);
  }
}
