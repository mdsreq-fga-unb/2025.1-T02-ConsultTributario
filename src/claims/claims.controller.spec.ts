import { Test, TestingModule } from '@nestjs/testing';
import { ClaimsController } from './claims.controller';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateClaimDto } from './dto/update-claim.dto';

const claimServiceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
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

  describe('create', () => {
    it('should create a claim', async () => {
      const createClaimDto: CreateClaimDto = {
        title: 'Test Claim',
        objective: 'This is a test claim',
        recoverable_period: 'Detailed description of the claim',
        summary: 'Summary of the claim',
        recoverable_value: '1000',
      };
      const result: any = { ...createClaimDto, _id: '1' };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createClaimDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createClaimDto);
    });

    it('should throw an error if claim creation fails', async () => {
      const createClaimDto: CreateClaimDto = {
        title: 'Test Claim',
        objective: 'This is a test claim',
        recoverable_period: 'Detailed description of the claim',
        summary: 'Summary of the claim',
        recoverable_value: '1000',
      };

      jest.spyOn(service, 'create').mockRejectedValue(new Error('Creation failed'));

      await expect(controller.create(createClaimDto)).rejects.toThrow('Creation failed');
    });
  });

  describe('findAll', () => {
    it('should return an array of claims', async () => {
      const result: any = [
        {
          title: 'Test Claim 1',
          objective: 'This is a test claim',
          recoverable_period: 'Detailed description of the claim',
          summary: 'Summary of the claim',
          recoverable_value: '1000',
        },
        {
          title: 'Test Claim 2',
          objective: 'This is a test claim',
          recoverable_period: 'Detailed description of the claim',
          summary: 'Summary of the claim',
          recoverable_value: '1000',
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a single claim by id', async () => {
      const result: any = {
        title: 'Test Claim 1',
        objective: 'This is a test claim',
        recoverable_period: 'Detailed description of the claim',
        summary: 'Summary of the claim',
        recoverable_value: '1000',
      };
      const id = 'fake_id';

      jest.spyOn(service, 'findById').mockResolvedValue(result);

      expect(await controller.findById(id)).toEqual(result);
      expect(service.findById).toHaveBeenCalledWith(id);
    });

    it('should throw an error if claim not found', async () => {
      const id = 'fake_id';

      jest.spyOn(service, 'findById').mockRejectedValue(new NotFoundException());
      await expect(controller.findById(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a claim', async () => {
      const id = 'fake_id';
      const updateClaimDto: UpdateClaimDto = {
        title: 'Updated Claim',
        objective: 'Updated objective',
        recoverable_period: 'Updated period',
        summary: 'Updated summary',
        recoverable_value: '2000',
      };
      const result: any = { ...updateClaimDto, _id: id };

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(id, updateClaimDto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(id, updateClaimDto);
    });

    it('should throw an error if claim update fails', async () => {
      const id = '1';
      const updateClaimDto: CreateClaimDto = {
        title: 'Updated Claim',
        objective: 'Updated objective',
        recoverable_period: 'Updated period',
        summary: 'Updated summary',
        recoverable_value: '2000',
      };

      jest.spyOn(service, 'update').mockRejectedValue(new Error());

      await expect(controller.update(id, updateClaimDto)).rejects.toThrow(Error);
    });
  });
});
