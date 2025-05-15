import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Question } from './schemas/question.schema';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(@InjectModel(Question.name) private readonly questionModel: Model<Question>) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    if (createQuestionDto.relatedQuestions.length > 0) {
      const existingQuestions = await this.questionModel
        .find({ _id: { $in: createQuestionDto.relatedQuestions } })
        .exec();
      if (existingQuestions.length !== createQuestionDto.relatedQuestions.length) {
        throw new BadRequestException('invalid related question IDs');
      }
    }

    return this.questionModel.create(createQuestionDto);
  }

  findAll() {
    return this.questionModel.find().populate('relatedQuestions').exec();
  }

  async findOne(id: string) {
    const question = await this.questionModel.findById(id).populate('relatedQuestions').exec();

    if (!question) {
      throw new NotFoundException('invalid id');
    }

    return question;
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const relatedQuestions = updateQuestionDto.relatedQuestions || [];
    if (relatedQuestions.length > 0) {
      if (relatedQuestions.includes(id)) {
        throw new BadRequestException('invalid related IDs');
      }

      const existingQuestions = await this.questionModel
        .find({ _id: { $in: relatedQuestions } })
        .exec();

      if (existingQuestions.length !== relatedQuestions.length) {
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

  async remove(id: string): Promise<void> {
    await this.questionModel.updateMany({ relatedQuestions: id }, { $pull: { relatedQuestions: id } });

    await this.questionModel.findByIdAndDelete(id).exec();
  }
}
