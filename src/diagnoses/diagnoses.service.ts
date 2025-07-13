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

  async create(diagnosis: CreateDiagnosisDto, userId: string): Promise<Diagnosis> {
    const questionIds = diagnosis.questionResponses.map((q) => q.questionId);

    const existingQuestions = await this.questionService.findByIdsActive(questionIds);
    if (existingQuestions.length !== questionIds.length) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_RELATED_QUESTIONS);
    }

    const createdDiagnosis = new this.diagnosisModel({
      ...diagnosis,
      createdBy: userId,
      questions: questionIds,
    });
    return createdDiagnosis.save();
  }

  async findAll(userId: string): Promise<Diagnosis[]> {
    return this.diagnosisModel.find({ createdBy: userId }).exec();
  }

  async findById(id: string, userId: string): Promise<Diagnosis> {
    const diagnosis = await this.diagnosisModel.findById(id).exec();
    if (!diagnosis) {
      throw new NotFoundException(ERROR_MESSAGES.ENTITY_NOT_FOUND);
    }
    if (diagnosis.createdBy.toString() !== userId) {
      throw new BadRequestException(ERROR_MESSAGES.UNAUTHORIZED_ACCESS);
    }
    return diagnosis;
  }

  async getRecommendations(id: string, userId: string): Promise<ClaimRecommendationResponseDto> {
    const diagnosis = await this.findById(id, userId);
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
    } as unknown as ClaimRecommendationResponseDto;
  }

  async delete(id: string, userId: string): Promise<void> {
    const diagnosis = await this.diagnosisModel.findById(id).exec();
    if (!diagnosis) {
      throw new NotFoundException(ERROR_MESSAGES.ENTITY_NOT_FOUND);
    }

    if (diagnosis.createdBy.toString() !== userId) {
      throw new BadRequestException(ERROR_MESSAGES.UNAUTHORIZED_ACCESS);
    }

    await this.diagnosisModel.deleteOne({ _id: id }).exec();
  }
}
