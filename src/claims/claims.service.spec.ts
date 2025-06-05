import { Test, TestingModule } from '@nestjs/testing';
import { ClaimsService } from './claims.service';
import { Claim } from './schemas/claim.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionsService } from '../questions/questions.service';

const claimModelMock = {
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
  findOne: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  updateMany: jest.fn().mockReturnValue({
    exec: jest.fn(),
  }),
  findByIdAndDelete: jest.fn().mockReturnValue({
    exec: jest.fn(),
  }),
};

const questionServiceMock = {
  findOne: jest.fn().mockResolvedValue({ _id: 'relatedQuestionId' }),
};

describe('ClaimsService', () => {
  let model: jest.Mocked<Model<Claim>>;
  let service: ClaimsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClaimsService,
        {
          provide: getModelToken(Claim.name),
          useValue: claimModelMock,
        },
        {
          provide: QuestionsService,
          useValue: questionServiceMock,
        },
      ],
    }).compile();

    model = module.get(getModelToken(Claim.name));
    service = module.get(ClaimsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
