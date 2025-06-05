import { Test, TestingModule } from '@nestjs/testing';
import { ClaimsController } from './claims.controller';
import { ClaimsService } from './claims.service';

const claimServiceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('ClaimsController', () => {
  let controller: ClaimsController;
  let service: ClaimsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClaimsController],
      providers: [
        {
          provide: ClaimsService,
          useValue: claimServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ClaimsController>(ClaimsController);
    service = module.get<ClaimsService>(ClaimsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
