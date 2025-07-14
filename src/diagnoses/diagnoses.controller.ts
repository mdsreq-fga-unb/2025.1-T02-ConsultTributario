import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DiagnosesService } from './diagnoses.service';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { MongoIdValidationPipe } from '@/common/pipes/mongo-id-validation.pipe';
import { Serialize } from '@/common/interceptors/serialize.interceptor';
import { DiagnosisDto, DiagnosisDtoWithoutQuestionResponses } from './dto/diagnosis.dto';
import { ClaimRecommendationResponseDto } from './dto/claim-recommendation.dto';
import { CurrentUser } from '@/auth/decorators/current-user.decorator';

@Controller('diagnoses')
export class DiagnosesController {
  constructor(private readonly diagnosesService: DiagnosesService) {}

  @Serialize(DiagnosisDtoWithoutQuestionResponses)
  @Post()
  create(@Body() createDiagnosisDto: CreateDiagnosisDto, @CurrentUser('id') userId: string) {
    return this.diagnosesService.create(createDiagnosisDto, userId);
  }

  @Serialize(DiagnosisDtoWithoutQuestionResponses)
  @Get()
  findAll(@CurrentUser('id') userId: string) {
    return this.diagnosesService.findAll(userId);
  }

  @Serialize(DiagnosisDto)
  @Get(':id')
  findById(@Param('id', MongoIdValidationPipe) id: string, @CurrentUser('id') userId: string) {
    return this.diagnosesService.findById(id, userId);
  }

  @Serialize(ClaimRecommendationResponseDto)
  @Get(':id/recommendations')
  async getRecommendations(@Param('id', MongoIdValidationPipe) id: string, @CurrentUser('id') userId: string) {
    return this.diagnosesService.getRecommendations(id, userId);
  }

  @Delete(':id')
  async delete(@Param('id', MongoIdValidationPipe) id: string, @CurrentUser('id') userId: string) {
    return this.diagnosesService.delete(id, userId);
  }

  @Get('cnpj/:cnpj')
  async getCnpjData(@Param('cnpj') cnpj: string) {
    return this.diagnosesService.fetchCnpjData(cnpj);
  }
}
