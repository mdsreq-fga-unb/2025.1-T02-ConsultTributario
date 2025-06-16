import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class TaxType {
  @Prop({ required: true, unique: true, maxlength: 30 })
  name: string;
}

export const TaxTypeSchema = SchemaFactory.createForClass(TaxType);
