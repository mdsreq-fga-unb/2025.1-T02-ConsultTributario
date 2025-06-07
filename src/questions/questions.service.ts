import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './schemas/question.schema';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { IQuestionService } from '@/shared/interfaces/question.interface';
import { QuestionDomainService } from './services/question-domain.service';

@Injectable()
export class QuestionsService implements IQuestionService {
  constructor(
    @InjectModel(Question.name) private readonly questionModel: Model<Question>,
    private readonly questionDomainService: QuestionDomainService,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    if (this.questionDomainService.hasRelatedQuestions(createQuestionDto)) {
      const existingQuestions = await this.questionModel
        .find({ _id: { $in: createQuestionDto.relatedQuestions } })
        .exec();

      if (existingQuestions.length !== createQuestionDto.relatedQuestions.length) {
        throw new BadRequestException('invalid related question IDs');
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
      throw new NotFoundException('invalid id');
    }

    return question;
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    if (this.questionDomainService.hasRelatedQuestions(updateQuestionDto)) {
      if (this.questionDomainService.validateSelfReference(id, updateQuestionDto.relatedQuestions ?? [])) {
        throw new BadRequestException('invalid related IDs');
      }

      const existingQuestions = await this.questionModel
        .find({ _id: { $in: updateQuestionDto.relatedQuestions } })
        .exec();

      if (existingQuestions.length !== updateQuestionDto.relatedQuestions?.length) {
        throw new BadRequestException('invalid related IDs');
      }
    }

    const updatedQuestion = await this.questionModel
      .findByIdAndUpdate(id, updateQuestionDto, { new: true })
      .populate('relatedQuestions')
      .exec();

    if (!updatedQuestion) {
      throw new NotFoundException('invalid id');
    }

    return updatedQuestion;
  }
}
