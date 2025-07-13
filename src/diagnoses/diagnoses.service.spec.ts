import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosesService } from './diagnoses.service';
import { getModelToken } from '@nestjs/mongoose';
import { Diagnosis } from './schema/diagnosis.schema';
import { QuestionsService } from '@/questions/questions.service';
import { ClaimsService } from '@/claims/claims.service';
import { HttpService } from '@nestjs/axios';

const diagnosisModelMock = {
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

const claimServiceMock = {
  findOne: jest.fn().mockResolvedValue({ _id: 'relatedQuestionId' }),
};

const httpServiceMock = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

describe('DiagnosesService', () => {
  let service: DiagnosesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiagnosesService,
        {
          provide: getModelToken(Diagnosis.name),
          useValue: diagnosisModelMock,
        },
        {
          provide: QuestionsService,
          useValue: questionServiceMock,
        },
        {
          provide: ClaimsService,
          useValue: claimServiceMock,
        },
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    service = module.get<DiagnosesService>(DiagnosesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});