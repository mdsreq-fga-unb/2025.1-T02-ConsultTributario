import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
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
      const createQuestionDto: CreateQuestionDto = {
        label: 'Test Question',
        relatedQuestions: [],
      };
      const result: any = { ...createQuestionDto, _id: '1' };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createQuestionDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createQuestionDto);
    });

    it('should throw an error if question creation fails', async () => {
      const createQuestionDto: CreateQuestionDto = {
        label: 'Test Question',
        relatedQuestions: [],
      };

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

  describe('update', () => {
    it('should update a question', async () => {
      const validId = '6824b6bc22d33d13503750b8';
      const updateQuestionDto: CreateQuestionDto = {
        label: 'Updated Question',
        relatedQuestions: [],
      };
      const result: any = { _id: validId, ...updateQuestionDto };

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(validId, updateQuestionDto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(validId, updateQuestionDto);
    });

    it('should throw an error if updating question fails', async () => {
      const validId = '6824b6bc22d33d13503750b8';
      const updateQuestionDto: CreateQuestionDto = {
        label: 'Updated Question',
        relatedQuestions: [],
      };

      jest.spyOn(service, 'update').mockRejectedValue(new Error());

      await expect(controller.update(validId, updateQuestionDto)).rejects.toThrow(new Error());
      expect(service.update).toHaveBeenCalledWith(validId, updateQuestionDto);
    });
  });
});
