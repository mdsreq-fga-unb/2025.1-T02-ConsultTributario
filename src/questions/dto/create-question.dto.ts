import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsMongoId,
  IsOptional,
} from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'Pergunta a ser feita',
    example: 'Como calcular ICMS?',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({
    description: 'Dica para o usuário',
    example: 'Essa pergunta é relacionada a ICMS',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  toolTip?: string;

  @ApiProperty({
    description: 'Array de IDs das perguntas relacionadas',
    example: ['123456789012345678901234', '123456789012345678901235'],
    type: [String],
    required: true,
  })
  @IsArray()
  @IsMongoId({ each: true })
  relatedQuestions: string[];
}
