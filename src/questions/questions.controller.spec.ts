import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './schemas/question.schema';

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
});
