import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './schemas/question.schema';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { IQuestionService } from '@/shared/interfaces/question.interface';
import { QuestionDomainService } from './services/question-domain.service';
import { ERROR_MESSAGES } from '@common/constants/app.constants';

@Injectable()
export class QuestionsService implements IQuestionService {
  constructor(
    @InjectModel(Question.name) private readonly questionModel: Model<Question>,
    private readonly questionDomainService: QuestionDomainService,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    if (await this.findByLabel(createQuestionDto.label)) {
      throw new BadRequestException(ERROR_MESSAGES.QUESTION_LABEL_EXISTS);
    }

    if (this.questionDomainService.hasRelatedQuestions(createQuestionDto)) {
      const existingQuestions = await this.findByIds(createQuestionDto.relatedQuestions);

      if (existingQuestions.length !== createQuestionDto.relatedQuestions.length) {
        throw new BadRequestException(ERROR_MESSAGES.INVALID_RELATED_QUESTIONS);
      }
    }

    return this.questionModel.create(createQuestionDto);
  }

  async findAll(): Promise<Question[]> {
    return await this.questionModel.find().populate('relatedQuestions').exec();
  }

  async findById(id: string): Promise<Question> {
    const question = await this.questionModel.findById(id).populate('relatedQuestions').exec();

    if (!question) {
      throw new NotFoundException(ERROR_MESSAGES.ENTITY_NOT_FOUND);
    }

    return question;
  }

  async findByLabel(label: string): Promise<Question | null> {
    return await this.questionModel.findOne({ label }).exec();
  }

  async findByIds(id: string[]): Promise<Question[]> {
    if (!id || id.length === 0) {
      return [];
    }

    const questions = await this.questionModel.find({ _id: { $in: id } }).exec();

    return questions;
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    if (this.questionDomainService.hasRelatedQuestions(updateQuestionDto)) {
      if (this.questionDomainService.validateSelfReference(id, updateQuestionDto.relatedQuestions ?? [])) {
        throw new BadRequestException(ERROR_MESSAGES.SELF_REFERENCE_NOT_ALLOWED);
      }

      const existingQuestions = await this.findByIds(updateQuestionDto.relatedQuestions ?? []);

      if (existingQuestions.length !== updateQuestionDto.relatedQuestions?.length) {
        throw new BadRequestException(ERROR_MESSAGES.INVALID_RELATED_QUESTIONS);
      }
    }

    const updatedQuestion = await this.questionModel
      .findByIdAndUpdate(id, updateQuestionDto, { new: true })
      .populate('relatedQuestions')
      .exec();

    if (!updatedQuestion) {
      throw new NotFoundException(ERROR_MESSAGES.ENTITY_NOT_FOUND);
    }

    return updatedQuestion;
  }
}
