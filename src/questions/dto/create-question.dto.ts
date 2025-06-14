import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsMongoId, IsOptional, MaxLength } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'Pergunta a ser feita',
    example: 'Como calcular ICMS?',
    type: String,
    required: true,
    uniqueItems: true,
    maxLength: 150,
  })
  @IsString()
  @MaxLength(150)
  @IsNotEmpty()
  label: string;

  @ApiProperty({
    description: 'Dica para o usuário',
    example: 'Essa pergunta é relacionada a ICMS',
    type: String,
    required: false,
    maxLength: 500,
  })
  @IsString()
  @MaxLength(500)
  @IsOptional()
  tooltip?: string;

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
