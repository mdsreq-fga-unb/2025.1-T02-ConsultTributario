import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsService } from './questions.service';
import { getModelToken } from '@nestjs/mongoose';
import { Question } from './schemas/question.schema';
import { Model } from 'mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionDomainService } from './services/question-domain.service';
import { ERROR_MESSAGES } from '@/common/constants/app.constants';

const questionModelMock = {
  create: jest.fn(),
  find: jest.fn().mockReturnValue({
    exec: jest.fn(),
    populate: jest.fn().mockReturnValue({
      exec: jest.fn(),
    }),
  }),
  findById: jest.fn().mockReturnValue({
    populate: jest.fn().mockReturnValue({
      exec: jest.fn(),
    }),
  }),
  findOne: jest.fn().mockReturnValue({
    exec: jest.fn(),
  }),
  findByIdAndUpdate: jest.fn(),
  updateMany: jest.fn().mockReturnValue({
    exec: jest.fn(),
  }),
  findByIdAndDelete: jest.fn().mockReturnValue({
    exec: jest.fn(),
  }),
};

describe('QuestionsService', () => {
  let model: jest.Mocked<Model<Question>>;
  let service: QuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionsService,
        {
          provide: getModelToken(Question.name),
          useValue: questionModelMock,
        },
        QuestionDomainService,
      ],
    }).compile();

    model = module.get(getModelToken(Question.name));
    service = module.get(QuestionsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a question without related questions', async () => {
      const mockedQuestion: CreateQuestionDto = {
        label: 'Test Question',
        tooltip: 'Test Tooltip',
        relatedQuestions: [],
      };
      jest.spyOn(service, 'findByLabel').mockResolvedValue(null);

      model.create.mockResolvedValue(mockedQuestion as any);

      const result = await service.create(mockedQuestion);

      expect(service.findByLabel).toHaveBeenCalledWith(mockedQuestion.label);
      expect(result).toEqual(mockedQuestion);
      expect(model.find).not.toHaveBeenCalled();
      expect(model.create).toHaveBeenCalledWith(mockedQuestion);
    });

    it('should create a question with valid related questions', async () => {
      const mockedQuestion: CreateQuestionDto = {
        label: 'Test Question',
        tooltip: 'Test Tooltip',
        relatedQuestions: ['123', '456'],
      };
      const mockQuery: any = {
        exec: jest.fn().mockResolvedValue(['123', '456']),
      };
      model.find.mockReturnValue(mockQuery);
      model.create.mockResolvedValue(mockedQuestion as any);

      const result = await service.create(mockedQuestion);

      expect(result).toEqual(mockedQuestion);
      expect(model.find).toHaveBeenCalled();
      expect(model.find).toHaveBeenCalledWith({
        _id: { $in: mockedQuestion.relatedQuestions },
      });
      expect(model.create).toHaveBeenCalledWith(mockedQuestion);
    });

    it('should throw BadRequestException when related questions ids are invalid', async () => {
      const mockedQuestion: CreateQuestionDto = {
        label: 'Test Question',
        tooltip: 'Test Tooltip',
        relatedQuestions: ['123', '456'],
      };
      const mockQuery: any = { exec: jest.fn().mockResolvedValue(['123']) };
      model.find.mockReturnValue(mockQuery);

      const result = service.create(mockedQuestion);

      await expect(result).rejects.toThrow(ERROR_MESSAGES.INVALID_RELATED_QUESTIONS);
      expect(model.find).toHaveBeenCalledWith({
        _id: { $in: mockedQuestion.relatedQuestions },
      });
      expect(model.create).not.toHaveBeenCalled();
    });

    it('should throw error when create fails', async () => {
      const mockedQuestion: CreateQuestionDto = {
        label: 'Test Question',
        tooltip: 'Test Tooltip',
        relatedQuestions: ['123', '456'],
      };
      const mockQuery: any = {
        exec: jest.fn().mockResolvedValue(['123', '456']),
      };
      model.find.mockReturnValue(mockQuery);
      const error = new Error('Database error');
      model.create.mockRejectedValue(error);

      const result = service.create(mockedQuestion);

      await expect(result).rejects.toThrow(error);
      expect(model.create).toHaveBeenCalledWith(mockedQuestion);
    });
  });

  describe('findAll', () => {
    it('should return array of questions with populated related questions', async () => {
      const mockQuestions = [
        {
          _id: '1',
          label: 'Question 1',
          relatedQuestions: [{ _id: '2', label: 'Related 1' }],
        },
        {
          _id: '2',
          label: 'Question 2',
          relatedQuestions: [],
        },
      ];
      const mockQuery: any = {
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockQuestions),
      };
      model.find.mockReturnValue(mockQuery);

      const result = await service.findAll();

      expect(result).toEqual(mockQuestions);
      expect(model.find).toHaveBeenCalled();
      expect(model.find().populate).toHaveBeenCalledWith('relatedQuestions');
    });

    it('should return empty array when no questions found', async () => {
      const mockQuery: any = {
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([]),
      };
      model.find.mockReturnValue(mockQuery);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(model.find).toHaveBeenCalled();
      expect(model.find().populate).toHaveBeenCalledWith('relatedQuestions');
    });
  });

  describe('findById', () => {
    it('should return a question with populated related questions', async () => {
      const mockQuestion = {
        _id: '1',
        label: 'Test Question',
        relatedQuestions: [{ _id: '2', label: 'Related Question' }],
      };
      const mockQuery: any = {
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockQuestion),
      };
      model.findById.mockReturnValue(mockQuery);

      const result = await service.findById('1');

      expect(result).toEqual(mockQuestion);
      expect(model.findById).toHaveBeenCalledWith('1');
      expect(mockQuery.populate).toHaveBeenCalledWith('relatedQuestions');
    });

    it('should throw NotFoundException when question is not found', async () => {
      const mockQuery: any = {
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      };
      model.findById.mockReturnValue(mockQuery);

      const result = service.findById('nonexistent-id');

      await expect(result).rejects.toThrow(NotFoundException);
      expect(model.findById).toHaveBeenCalledWith('nonexistent-id');
    });

    it('should throw error when database query fails', async () => {
      const error = new Error('Database error');
      const mockQuery: any = {
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(error),
      };
      model.findById.mockReturnValue(mockQuery);

      const result = service.findById('1');

      await expect(result).rejects.toThrow(error);
      expect(model.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update question without related questions', async () => {
      const questionId = '123';
      const updateDto: UpdateQuestionDto = {
        label: 'Updated Question',
        tooltip: 'Updated Tooltip',
        isActive: false,
      };
      const updatedQuestion = { ...updateDto, _id: questionId };

      const mockQuery: any = {
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(updatedQuestion),
      };
      model.findByIdAndUpdate.mockReturnValue(mockQuery);

      const result = await service.update(questionId, updateDto);

      expect(result).toEqual(updatedQuestion);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(questionId, updateDto, { new: true });
    });

    it('should update question with valid related questions', async () => {
      const questionId = '123';
      const updateDto: UpdateQuestionDto = {
        label: 'Updated Question',
        relatedQuestions: ['456', '789'],
      };

      const mockQuery: any = {
        exec: jest.fn().mockResolvedValue([{ _id: '456' }, { _id: '789' }]),
      };
      model.find.mockReturnValue(mockQuery);

      model.findByIdAndUpdate.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue({ ...updateDto, _id: questionId }),
      } as any);

      const result = await service.update(questionId, updateDto);

      expect(result).toBeDefined();
      expect(model.find).toHaveBeenCalledWith({
        _id: { $in: updateDto.relatedQuestions },
      });
    });

    it('should throw BadRequestException when related questions ids are invalid', async () => {
      const questionId = '123';
      const updateDto: UpdateQuestionDto = {
        label: 'Updated Question',
        relatedQuestions: ['456', '789'],
      };

      model.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue([{ _id: '456' }]),
      } as any);

      const result = service.update(questionId, updateDto);

      await expect(result).rejects.toThrow(ERROR_MESSAGES.INVALID_RELATED_QUESTIONS);
      expect(model.findByIdAndUpdate).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when trying to self-reference', async () => {
      const questionId = '123';
      const updateDto: UpdateQuestionDto = {
        label: 'Updated Question',
        relatedQuestions: ['456', '123'],
      };

      const result = service.update(questionId, updateDto);

      await expect(result).rejects.toThrow(ERROR_MESSAGES.SELF_REFERENCE_NOT_ALLOWED);
      expect(model.find).not.toHaveBeenCalled();
      expect(model.findByIdAndUpdate).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException when question to update does not exist', async () => {
      const questionId = 'nonexistent';
      const updateDto: UpdateQuestionDto = {
        label: 'Updated Question',
      };

      model.findByIdAndUpdate.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      await expect(service.update(questionId, updateDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw error when database operation fails', async () => {
      const questionId = '123';
      const updateDto: UpdateQuestionDto = {
        label: 'Updated Question',
      };

      const error = new Error('Database error');
      model.findByIdAndUpdate.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(error),
      } as any);

      const result = service.update(questionId, updateDto);

      await expect(result).rejects.toThrow(error);
    });
  });

  describe('findByIds', () => {
    it('should return an array of questions for given ids', async () => {
      const questionIds = ['1', '2'];
      const mockQuestions = [
        { _id: '1', label: 'Question 1' },
        { _id: '2', label: 'Question 2' },
      ];
      model.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockQuestions),
      } as any);

      const result = await service.findByIds(questionIds);

      expect(result).toEqual(mockQuestions);
      expect(model.find).toHaveBeenCalledWith({ _id: { $in: questionIds } });
    });

    it('should return an empty array if no ids are provided', async () => {
      const result = await service.findByIds([]);

      expect(result).toEqual([]);
      expect(model.find).not.toHaveBeenCalled();
    });

    it('should throw error when database operation fails', async () => {
      const error = new Error('Database error');
      model.find.mockReturnValue({
        exec: jest.fn().mockRejectedValue(error),
      } as any);

      const result = service.findByIds(['1']);

      await expect(result).rejects.toThrow(error);
    });
  });
});
