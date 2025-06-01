import { Test, TestingModule } from '@nestjs/testing';
import { ClaimsController } from './claims.controller';
import { ClaimsService } from './claims.service';

describe('ClaimsController', () => {
  let controller: ClaimsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClaimsController],
      providers: [ClaimsService],
    }).compile();

    controller = module.get<ClaimsController>(ClaimsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
