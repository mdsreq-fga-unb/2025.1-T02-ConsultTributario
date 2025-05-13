import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ObjectId } from 'mongodb';

export interface QuestionWithRelated extends Question {
  relatedQuestionsDescriptions: string[];
}

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>
  ) {}

  findById(id: string): Promise<Question | null> {
    if (!ObjectId.isValid(id)) {
      return Promise.resolve(null);
    }
    const questionId = new ObjectId(id);
    return this.questionRepo.findOne({ where: { _id: questionId } });
  }

  async findByIdRelated(id: string): Promise<QuestionWithRelated | null> {
    const question = await this.findById(id);
    if (!question) {
      return Promise.resolve(null);
    }

    const relatedQuestionsDescriptions = await Promise.all(
      question.relatedQuestions.map(async (relatedQuestionId) => {
        const relatedQuestion = await this.findById(
          relatedQuestionId.toString()
        );
        if (!relatedQuestion) {
          throw new NotFoundException('invalid related question');
        }
        return relatedQuestion.description;
      })
    );

    return {
      ...question,
      relatedQuestionsDescriptions: relatedQuestionsDescriptions,
    };
  }

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    if (!createQuestionDto.relatedQuestions.length) {
      const question = this.questionRepo.create({
        description: createQuestionDto.description,
        relatedQuestions: [],
      });
      return this.questionRepo.save(question);
    }

    const relatedQuestionIds = createQuestionDto.relatedQuestions.map((id) => {
      if (!ObjectId.isValid(id.toString())) {
        throw new NotFoundException('invalid related question id');
      }
      return new ObjectId(id.toString());
    });

    const existingQuestions = await Promise.all(
      relatedQuestionIds.map(async (id) => {
        const exists = await this.findById(id.toString());
        if (!exists) {
          throw new NotFoundException('invalid related question');
        }
        return id;
      })
    );

    const question = this.questionRepo.create({
      description: createQuestionDto.description,
      relatedQuestions: existingQuestions,
    });

    return this.questionRepo.save(question);
  }

  async findAll(): Promise<Question[]> {
    return this.questionRepo.find();
  }

  async delete(id: string): Promise<void> {
    const question = await this.findById(id);
    if (!question) {
      return;
    }

    const questionsWithReferences = await this.questionRepo.find({
      where: {
        relatedQuestions: new ObjectId(id),
      },
    });

    await Promise.all(
      questionsWithReferences.map(async (relatedQuestion) => {
        relatedQuestion.relatedQuestions =
          relatedQuestion.relatedQuestions.filter(
            (relatedId) => relatedId.toString() !== id
          );
        await this.questionRepo.save(relatedQuestion);
      })
    );

    this.questionRepo.remove(question);
  }
}
