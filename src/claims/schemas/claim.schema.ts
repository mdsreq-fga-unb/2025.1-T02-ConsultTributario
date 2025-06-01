import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Question } from 'src/questions/schemas/question.schema';

@Schema({ timestamps: true })
export class Claim extends Document {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop()
  objective: string;

  @Prop()
  summary: string;

  @Prop()
  recoverable_period: string;

  @Prop()
  recoverable_value: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Question' })
  relatedQuestion: Question;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);
