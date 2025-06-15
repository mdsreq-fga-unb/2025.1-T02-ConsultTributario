import { Test, TestingModule } from '@nestjs/testing';
import { ClaimsController } from './claims.controller';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

const mockClaim = {
  _id: '507f1f77bcf86cd799439011',
  title: 'Test Claim',
  objective: 'This is a test claim',
  recoverable_period: 'Detailed description of the claim',
  summary: 'Summary of the claim',
  recoverable_value: '1000',
  relatedQuestion: '507f1f77bcf86cd799439012',
};

const claimsServiceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
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
          useValue: claimsServiceMock,
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
    const createClaimDto: CreateClaimDto = {
      title: 'Test Claim',
      objective: 'This is a test claim',
      recoverable_period: 'Detailed description of the claim',
      summary: 'Summary of the claim',
      recoverable_value: '1000',
      taxType: 'valid-tax-type-id',
    };

    it('should create a claim successfully', async () => {
      const expectedResult = { ...mockClaim, ...createClaimDto };
      claimsServiceMock.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createClaimDto);

      expect(result).toEqual(expectedResult);
      expect(claimsServiceMock.create).toHaveBeenCalledWith(createClaimDto);
      expect(claimsServiceMock.create).toHaveBeenCalledTimes(1);
    });

    it('should create a claim with related question', async () => {
      const createClaimDtoWithQuestion: CreateClaimDto = {
        ...createClaimDto,
        relatedQuestion: '507f1f77bcf86cd799439012',
      };
      const expectedResult = { ...mockClaim, ...createClaimDtoWithQuestion };
      claimsServiceMock.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createClaimDtoWithQuestion);

      expect(result).toEqual(expectedResult);
      expect(claimsServiceMock.create).toHaveBeenCalledWith(createClaimDtoWithQuestion);
    });

    it('should throw BadRequestException when claim title already exists', async () => {
      const error = new BadRequestException('Claim title already exists');
      claimsServiceMock.create.mockRejectedValue(error);

      await expect(controller.create(createClaimDto)).rejects.toThrow(BadRequestException);
      expect(claimsServiceMock.create).toHaveBeenCalledWith(createClaimDto);
    });

    it('should throw BadRequestException when related question is invalid', async () => {
      const createClaimDtoWithInvalidQuestion: CreateClaimDto = {
        ...createClaimDto,
        relatedQuestion: 'invalid-question-id',
      };
      const error = new BadRequestException('Invalid related question IDs');
      claimsServiceMock.create.mockRejectedValue(error);

      await expect(controller.create(createClaimDtoWithInvalidQuestion)).rejects.toThrow(BadRequestException);
    });

    it('should handle unexpected errors during creation', async () => {
      const error = new Error('Database connection failed');
      claimsServiceMock.create.mockRejectedValue(error);

      await expect(controller.create(createClaimDto)).rejects.toThrow('Database connection failed');
    });
  });

  describe('findAll', () => {
    it('should return an array of claims', async () => {
      const mockClaims = [
        { ...mockClaim, title: 'Test Claim 1' },
        { ...mockClaim, _id: '507f1f77bcf86cd799439013', title: 'Test Claim 2' },
      ];
      claimsServiceMock.findAll.mockResolvedValue(mockClaims);

      const result = await controller.findAll();

      expect(result).toEqual(mockClaims);
      expect(claimsServiceMock.findAll).toHaveBeenCalledTimes(1);
      expect(claimsServiceMock.findAll).toHaveBeenCalledWith();
    });

    it('should return empty array when no claims exist', async () => {
      claimsServiceMock.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(claimsServiceMock.findAll).toHaveBeenCalledTimes(1);
    });

    it('should handle database errors', async () => {
      const error = new Error('Database connection failed');
      claimsServiceMock.findAll.mockRejectedValue(error);

      await expect(controller.findAll()).rejects.toThrow('Database connection failed');
    });
  });

  describe('findById', () => {
    const validId = '507f1f77bcf86cd799439011';

    it('should return a single claim by id', async () => {
      claimsServiceMock.findById.mockResolvedValue(mockClaim);

      const result = await controller.findById(validId);

      expect(result).toEqual(mockClaim);
      expect(claimsServiceMock.findById).toHaveBeenCalledWith(validId);
      expect(claimsServiceMock.findById).toHaveBeenCalledTimes(1);
    });

    it('should return claim with populated related question', async () => {
      const claimWithPopulatedQuestion = {
        ...mockClaim,
        relatedQuestion: {
          _id: '507f1f77bcf86cd799439012',
          text: 'Related question text',
        },
      };
      claimsServiceMock.findById.mockResolvedValue(claimWithPopulatedQuestion);

      const result = await controller.findById(validId);

      expect(result).toEqual(claimWithPopulatedQuestion);
      expect(result.relatedQuestion).toHaveProperty('text');
    });

    it('should throw NotFoundException when claim does not exist', async () => {
      const error = new NotFoundException('Entity not found');
      claimsServiceMock.findById.mockRejectedValue(error);

      await expect(controller.findById(validId)).rejects.toThrow(NotFoundException);
      expect(claimsServiceMock.findById).toHaveBeenCalledWith(validId);
    });

    it('should handle database errors during findById', async () => {
      const error = new Error('Database connection failed');
      claimsServiceMock.findById.mockRejectedValue(error);

      await expect(controller.findById(validId)).rejects.toThrow('Database connection failed');
    });
  });

  describe('update', () => {
    const validId = '507f1f77bcf86cd799439011';
    const updateClaimDto: UpdateClaimDto = {
      title: 'Updated Claim',
      objective: 'Updated objective',
      recoverable_period: 'Updated period',
      summary: 'Updated summary',
      recoverable_value: '2000',
    };

    it('should update a claim successfully', async () => {
      const updatedClaim = { ...mockClaim, ...updateClaimDto };
      claimsServiceMock.update.mockResolvedValue(updatedClaim);

      const result = await controller.update(validId, updateClaimDto);

      expect(result).toEqual(updatedClaim);
      expect(claimsServiceMock.update).toHaveBeenCalledWith(validId, updateClaimDto);
      expect(claimsServiceMock.update).toHaveBeenCalledTimes(1);
    });

    it('should update claim with new related question', async () => {
      const updateWithRelatedQuestion: UpdateClaimDto = {
        ...updateClaimDto,
        relatedQuestion: '507f1f77bcf86cd799439014',
      };
      const updatedClaim = { ...mockClaim, ...updateWithRelatedQuestion };
      claimsServiceMock.update.mockResolvedValue(updatedClaim);

      const result = await controller.update(validId, updateWithRelatedQuestion);

      expect(result).toEqual(updatedClaim);
      expect(claimsServiceMock.update).toHaveBeenCalledWith(validId, updateWithRelatedQuestion);
    });

    it('should update only provided fields (partial update)', async () => {
      const partialUpdate: UpdateClaimDto = {
        title: 'Partially Updated Title',
      };
      const updatedClaim = { ...mockClaim, ...partialUpdate };
      claimsServiceMock.update.mockResolvedValue(updatedClaim);

      const result = await controller.update(validId, partialUpdate);

      expect(result).toEqual(updatedClaim);
      expect(claimsServiceMock.update).toHaveBeenCalledWith(validId, partialUpdate);
    });

    it('should throw NotFoundException when claim does not exist', async () => {
      const error = new NotFoundException('Entity not found');
      claimsServiceMock.update.mockRejectedValue(error);

      await expect(controller.update(validId, updateClaimDto)).rejects.toThrow(NotFoundException);
      expect(claimsServiceMock.update).toHaveBeenCalledWith(validId, updateClaimDto);
    });

    it('should throw BadRequestException when title already exists for another claim', async () => {
      const error = new BadRequestException('Claim title already exists');
      claimsServiceMock.update.mockRejectedValue(error);

      await expect(controller.update(validId, updateClaimDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException when related question is invalid', async () => {
      const updateWithInvalidQuestion: UpdateClaimDto = {
        ...updateClaimDto,
        relatedQuestion: 'invalid-question-id',
      };
      const error = new BadRequestException('Invalid related question IDs');
      claimsServiceMock.update.mockRejectedValue(error);

      await expect(controller.update(validId, updateWithInvalidQuestion)).rejects.toThrow(BadRequestException);
    });

    it('should handle database errors during update', async () => {
      const error = new Error('Database connection failed');
      claimsServiceMock.update.mockRejectedValue(error);

      await expect(controller.update(validId, updateClaimDto)).rejects.toThrow('Database connection failed');
    });
  });
});
