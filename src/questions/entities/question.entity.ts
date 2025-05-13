import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Question {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  description: string;

  @Column()
  relatedQuestions: ObjectId[] = [];
}
