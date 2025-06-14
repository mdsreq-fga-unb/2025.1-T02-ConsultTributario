import { CreateQuestionDto } from '@/questions/dto/create-question.dto';
import { UpdateQuestionDto } from '@/questions/dto/update-question.dto';
import { Question } from '@/questions/schemas/question.schema';

export interface IQuestionService {
  create(data: Partial<CreateQuestionDto>): Promise<Question>;
  findAll(): Promise<Question[]>;
  findById(id: string): Promise<Question>;
  update(id: string, data: UpdateQuestionDto): Promise<Question>;
}
