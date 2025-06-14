import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { Question, QuestionSchema } from './schemas/question.schema';
import { Claim, ClaimSchema } from '../claims/schemas/claim.schema';
import { QuestionDomainService } from './services/question-domain.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }])],
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionDomainService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
