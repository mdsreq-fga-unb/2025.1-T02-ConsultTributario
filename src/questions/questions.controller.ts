import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Types } from 'mongoose';
import { Serialize } from '../interceptors/serialize.interceptor';
import { QuestionDto } from './dto/question.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Question } from './schemas/question.schema';

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

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma pergunta pelo ID' })
  @ApiResponse({ status: 200, description: 'Pergunta retornada com sucesso' })
  @ApiResponse({ status: 404, description: 'ID inválido' })
  @ApiResponse({ status: 400, description: 'Pergunta não encontrada' })
  async findOne(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('invalid id');
    }
    return this.questionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma pergunta existente' })
  @ApiBody({ type: UpdateQuestionDto })
  @ApiResponse({ status: 200, description: 'Pergunta atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'ID inválido' })
  @ApiResponse({ status: 400, description: 'Pergunta não encontrada' })
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('invalid id');
    }
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Apaga uma pergunta existente' })
  @ApiBody({ type: UpdateQuestionDto })
  @ApiResponse({ status: 204, description: 'Pergunta apagada com sucesso' })
  @ApiResponse({ status: 404, description: 'ID inválido' })
  remove(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('invalid id');
    }
    return this.questionsService.remove(id);
  }
}
