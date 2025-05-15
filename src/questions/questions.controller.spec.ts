import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './schemas/question.schema';
import { BadRequestException } from '@nestjs/common';

const questionServiceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('QuestionsController', () => {
  let controller: QuestionsController;
  let service: QuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsController],
      providers: [
        {
          provide: QuestionsService,
          useValue: questionServiceMock,
        },
      ],
    }).compile();

    controller = module.get<QuestionsController>(QuestionsController);
    service = module.get<QuestionsService>(QuestionsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a question', async () => {
      const createQuestionDto: CreateQuestionDto = { label: 'Test Question', relatedQuestions: [] };
      const result: any = { ...createQuestionDto, _id: '1' };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createQuestionDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createQuestionDto);
    });

    it('should throw an error if question creation fails', async () => {
      const createQuestionDto: CreateQuestionDto = { label: 'Test Question', relatedQuestions: [] };

      jest.spyOn(service, 'create').mockRejectedValue(new Error());

      await expect(controller.create(createQuestionDto)).rejects.toThrow(new Error());
      expect(service.create).toHaveBeenCalledWith(createQuestionDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of questions', async () => {
      const result: any = [
        { _id: '1', label: 'Test Question 1', relatedQuestions: [] },
        { _id: '2', label: 'Test Question 2', relatedQuestions: [] },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should throw an error if fetching questions fails', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValue(new Error());

      await expect(controller.findAll()).rejects.toThrow(new Error());
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a question by id', async () => {
      const validId = '6824b6bc22d33d13503750b8';
      const result: any = { _id: validId, label: 'Test Question', relatedQuestions: [] };

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(validId)).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(validId);
    });

    it('should throw BadRequestException if invalid id is provided', async () => {
      const invalidId = 'invalid-id';

      await expect(controller.findOne(invalidId)).rejects.toThrow(BadRequestException);
      expect(service.findOne).not.toHaveBeenCalled();
    });

    it('should throw an error if fetching question by id fails', async () => {
      const validId = '6824b6bc22d33d13503750b8';
      jest.spyOn(service, 'findOne').mockRejectedValue(new Error());

      await expect(controller.findOne(validId)).rejects.toThrow(new Error());
      expect(service.findOne).toHaveBeenCalledWith(validId);
    });
  });
});
