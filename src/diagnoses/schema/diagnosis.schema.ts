import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export enum AnswerType {
  YES = 'yes',
  NO = 'no',
  DONT_KNOW = 'dont_know',
}

export interface QuestionResponse {
  questionId: MongooseSchema.Types.ObjectId;
  answer: AnswerType;
}

@Schema({ timestamps: true })
export class Diagnosis extends Document {
  @Prop({ required: true })
  clientName: string;

  @Prop({
    required: true,
    type: [
      {
        _id: false,
        questionId: {
          type: MongooseSchema.Types.ObjectId,
          ref: 'Question',
          required: true,
        },
        answer: {
          type: String,
          enum: Object.values(AnswerType),
          required: true,
        },
      },
    ],
  })
  questionResponses: QuestionResponse[];
}

export const DiagnosisSchema = SchemaFactory.createForClass(Diagnosis);
