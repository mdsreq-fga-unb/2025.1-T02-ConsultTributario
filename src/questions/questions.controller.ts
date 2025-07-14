import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Serialize } from '../common/interceptors/serialize.interceptor';
import { QuestionDto, QuestionDtoMinimal } from './dto/question.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MongoIdValidationPipe } from '@common/pipes/mongo-id-validation.pipe';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/auth/decorators/roles.decorator';
import { UserRole } from '@/users/schemas/user.schema';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @Serialize(QuestionDto)
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Cria uma nova pergunta' })
  @ApiBody({ type: CreateQuestionDto })
  @ApiResponse({ status: 201, description: 'Pergunta criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao criar pergunta' })
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  @Serialize(QuestionDto)
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Lista todas as perguntas salvas' })
  @ApiResponse({ status: 200, description: 'Perguntas retornadas com sucesso' })
  findAll() {
    return this.questionsService.findAll();
  }

  @Get('active')
  @Serialize(QuestionDtoMinimal)
  @ApiOperation({ summary: 'Lista todas as perguntas salvas' })
  @ApiResponse({ status: 200, description: 'Perguntas retornadas com sucesso' })
  findAllActive() {
    return this.questionsService.findAllActive();
  }

  @Patch(':id')
  @Serialize(QuestionDto)
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Atualiza uma pergunta existente' })
  @ApiBody({ type: UpdateQuestionDto })
  @ApiResponse({ status: 200, description: 'Pergunta atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'ID inválido' })
  @ApiResponse({ status: 400, description: 'Pergunta não encontrada' })
  async update(@Param('id', MongoIdValidationPipe) id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(id, updateQuestionDto);
  }
}
