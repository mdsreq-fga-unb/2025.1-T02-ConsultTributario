import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Serialize } from '../common/interceptors/serialize.interceptor';
import { QuestionDto } from './dto/question.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MongoIdValidationPipe } from '@common/pipes/mongo-id-validation.pipe';

@Serialize(QuestionDto)
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova pergunta' })
  @ApiBody({ type: CreateQuestionDto })
  @ApiResponse({ status: 201, description: 'Pergunta criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao criar pergunta' })
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as perguntas salvas' })
  @ApiResponse({ status: 200, description: 'Perguntas retornadas com sucesso' })
  findAll() {
    return this.questionsService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma pergunta existente' })
  @ApiBody({ type: UpdateQuestionDto })
  @ApiResponse({ status: 200, description: 'Pergunta atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'ID inválido' })
  @ApiResponse({ status: 400, description: 'Pergunta não encontrada' })
  async update(@Param('id', MongoIdValidationPipe) id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(id, updateQuestionDto);
  }
}
