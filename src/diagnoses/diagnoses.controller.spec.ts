import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosesController } from './diagnoses.controller';
import { DiagnosesService } from './diagnoses.service';

const diagnosisServiceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('DiagnosesController', () => {
  let controller: DiagnosesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiagnosesController],
      providers: [
        {
          provide: DiagnosesService,
          useValue: diagnosisServiceMock,
        },
      ],
    }).compile();

    controller = module.get<DiagnosesController>(DiagnosesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
