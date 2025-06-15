import { Test, TestingModule } from '@nestjs/testing';
import { ClaimsService } from './claims.service';
import { Claim } from './schemas/claim.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionsService } from '../questions/questions.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateClaimDto } from './dto/update-claim.dto';

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

const questionServiceMock = {
  findById: jest.fn().mockResolvedValue({ _id: 'relatedQuestionId' }),
  findByIdsActive: jest.fn().mockResolvedValue([{ _id: 'relatedQuestionId' }]),
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

      model.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);
      model.create.mockResolvedValue(result);

      expect(await service.create(createClaimDto)).toEqual(result);
      expect(model.findOne).toHaveBeenCalledWith({ title: createClaimDto.title });
      expect(model.create).toHaveBeenCalledWith(createClaimDto);
      expect(model.findById).not.toHaveBeenCalled();
    });

    it('should throw an error if invalid related question is provided', async () => {
      const createClaimDto = {
        title: 'Test Claim',
        objective: 'This is a test claim',
        recoverable_period: 'Detailed description of the claim',
        summary: 'Summary of the claim',
        recoverable_value: '1000',
        relatedQuestion: 'invalid_id',
      };

      questionServiceMock.findByIdsActive.mockReturnValue([]);

      await expect(service.create(createClaimDto)).rejects.toThrow(BadRequestException);
      expect(model.create).not.toHaveBeenCalled();
    });

    it('should throw an error if claim title already exists', async () => {
      const createClaimDto: CreateClaimDto = {
        title: 'Existing Claim',
        objective: 'This is a test claim',
        recoverable_period: 'Detailed description of the claim',
        summary: 'Summary of the claim',
        recoverable_value: '1000',
      };

      model.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ _id: '1' }),
      } as any);

      await expect(service.create(createClaimDto)).rejects.toThrow(BadRequestException);
      expect(model.create).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of claims', async () => {
      const claims = [
        { _id: '1', title: 'Claim 1' },
        { _id: '2', title: 'Claim 2' },
      ];

      model.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(claims),
        populate: jest.fn().mockReturnThis(),
      } as any);

      expect(await service.findAll()).toEqual(claims);
      expect(model.find).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a claim by id', async () => {
      const claim = { _id: '1', title: 'Claim 1' };

      model.findById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(claim),
      } as any);

      expect(await service.findById('1')).toEqual(claim);
      expect(model.findById).toHaveBeenCalledWith('1');
    });

    it('should throw an error if claim not found', async () => {
      model.findById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      await expect(service.findById('nonexistent_id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a claim', async () => {
      const updateClaimDto: UpdateClaimDto = {
        title: 'Updated Claim',
        objective: 'This is an updated test claim',
        recoverable_period: 'Updated detailed description of the claim',
        summary: 'Updated summary of the claim',
        recoverable_value: '2000',
      };
      const result: any = { ...updateClaimDto, _id: '1' };

      model.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(result),
        populate: jest.fn().mockReturnThis(),
      } as any);

      model.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      expect(await service.update('1', updateClaimDto)).toEqual(result);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith('1', updateClaimDto, { new: true });
    });

    it('should throw an error if nonexistent id is provided', async () => {
      const updateClaimDto: UpdateClaimDto = {
        title: 'Updated Claim',
        objective: 'This is an updated test claim',
        recoverable_period: 'Updated detailed description of the claim',
        summary: 'Updated summary of the claim',
        recoverable_value: '2000',
        relatedQuestion: 'relatedQuestionId',
      };

      model.findByIdAndUpdate.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      await expect(service.update('nonexistent_id', updateClaimDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw an error if invalid related question is provided', async () => {
      const updateClaimDto: UpdateClaimDto = {
        title: 'Test Claim',
        objective: 'This is a test claim',
        recoverable_period: 'Detailed description of the claim',
        summary: 'Summary of the claim',
        recoverable_value: '1000',
        relatedQuestion: 'invalid_id',
      };

      questionServiceMock.findById.mockReturnValue(null);

      await expect(service.update('1', updateClaimDto)).rejects.toThrow(BadRequestException);
      expect(model.create).not.toHaveBeenCalled();
    });

    it('should throw an error if claim title already exists', async () => {
      const updateClaimDto: UpdateClaimDto = {
        title: 'Existing Claim',
        objective: 'This is a test claim',
        recoverable_period: 'Detailed description of the claim',
        summary: 'Summary of the claim',
        recoverable_value: '1000',
      };

      model.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ _id: '1' }),
      } as any);

      await expect(service.update('1', updateClaimDto)).rejects.toThrow(BadRequestException);
      expect(model.create).not.toHaveBeenCalled();
    });
  });

  describe('findByRelatedQuestion', () => {
    it('should return claims related to a specific question', async () => {
      const questionsIds = ['relatedQuestionId1', 'relatedQuestionId2'];
      const claims = [
        { _id: '1', title: 'Claim 1', relatedQuestion: 'relatedQuestionId1' },
        { _id: '2', title: 'Claim 2', relatedQuestion: 'relatedQuestionId2' },
      ];

      model.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(claims),
        populate: jest.fn().mockReturnThis(),
      } as any);

      expect(await service.findByRelatedQuestions(questionsIds)).toEqual(claims);
      expect(model.find).toHaveBeenCalledWith({ relatedQuestion: { $in: questionsIds } });
    });

    it('should return an empty array if no claims are found for the related question', async () => {
      const questionsIds = ['nonexistentQuestionId'];

      model.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue([]),
        populate: jest.fn().mockReturnThis(),
      } as any);

      expect(await service.findByRelatedQuestions(questionsIds)).toEqual([]);
      expect(model.find).toHaveBeenCalledWith({ relatedQuestion: { $in: questionsIds } });
    });
  });
});
