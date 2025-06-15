import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Question } from '../../questions/schemas/question.schema';

@Schema({ timestamps: true })
export class Claim extends Document {
  @Prop({ required: true, unique: true, maxlength: 150 })
  title: string;

  @Prop({ required: true, maxlength: 1000 })
  objective: string;

  @Prop({ required: true, maxlength: 5000 })
  summary: string;

  @Prop({ required: true, maxlength: 1000 })
  recoverable_period: string;

  @Prop({ required: true, maxlength: 1000 })
  recoverable_value: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Question',
    default: null,
  })
  relatedQuestion: Question;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);
