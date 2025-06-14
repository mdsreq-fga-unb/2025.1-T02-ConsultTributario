import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AnswerType, Diagnosis } from './schema/diagnosis.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { QuestionsService } from '@/questions/questions.service';
import { ERROR_MESSAGES } from '@common/constants/app.constants';
import { ClaimsService } from '@/claims/claims.service';
import { IDiagnosesService } from '@/shared/interfaces/diagnosis.interface';
import { ClaimRecommendationResponseDto } from './dto/claim-recommendation.dto';

@Injectable()
export class DiagnosesService implements IDiagnosesService {
  constructor(
    @InjectModel(Diagnosis.name) private diagnosisModel: Model<Diagnosis>,
    private readonly questionService: QuestionsService,
    private readonly claimService: ClaimsService,
  ) {}

  async create(diagnosis: CreateDiagnosisDto): Promise<Diagnosis> {
    const questionIds = diagnosis.questionResponses.map((q) => q.questionId);

    const existingQuestions = await this.questionService.findByIds(questionIds);
    if (existingQuestions.length !== questionIds.length) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_RELATED_QUESTIONS);
    }

    const createdDiagnosis = new this.diagnosisModel({
      ...diagnosis,
      questions: questionIds,
    });
    return createdDiagnosis.save();
  }

  async findAll(): Promise<Diagnosis[]> {
    return this.diagnosisModel.find().exec();
  }

  async findById(id: string): Promise<Diagnosis> {
    const diagnosis = await this.diagnosisModel.findById(id).exec();
    if (!diagnosis) {
      throw new NotFoundException(ERROR_MESSAGES.ENTITY_NOT_FOUND);
    }
    return diagnosis;
  }

  async getRecommendations(id: string): Promise<ClaimRecommendationResponseDto> {
    const diagnosis = await this.findById(id);
    if (!diagnosis) {
      throw new NotFoundException(ERROR_MESSAGES.ENTITY_NOT_FOUND);
    }

    const relevantQuestions = diagnosis.questionResponses
      .filter((response) => response.answer === AnswerType.YES || response.answer === AnswerType.DONT_KNOW)
      .map((response) => response.questionId.toString());

    const recommendedClaims = await this.claimService.findByRelatedQuestions(relevantQuestions);

    return {
      diagnosis,
      relevantAnswersCount: relevantQuestions.length,
      recommendedClaims,
    } as ClaimRecommendationResponseDto;
  }

  async delete(id: string): Promise<void> {
    const result = await this.diagnosisModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(ERROR_MESSAGES.ENTITY_NOT_FOUND);
    }
  }
}
