import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Question extends Document {
  @Prop({ required: true })
  label: string;

  @Prop()
  tooltip: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Question' }] })
  relatedQuestions: Question[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
