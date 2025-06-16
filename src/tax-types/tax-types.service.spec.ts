import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaxTypesService } from '@/tax-types/tax-types.service';
import { TaxType } from './schemas/category.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const taxTypeModelMock = {
  create: jest.fn(),
  find: jest.fn().mockReturnValue({
    exec: jest.fn(),
    populate: jest.fn().mockReturnValue({
      exec: jest.fn(),
    }),
  }),
  findById: jest.fn().mockReturnValue({
    exec: jest.fn(),
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

describe('TaxTypesService', () => {
  let model: jest.Mocked<Model<TaxType>>;
  let service: TaxTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaxTypesService,
        {
          provide: getModelToken(TaxType.name),
          useValue: taxTypeModelMock,
        },
      ],
    }).compile();

    model = module.get(getModelToken(TaxType.name));
    service = module.get(TaxTypesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tax types', async () => {
      const mockTaxTypes = [{ name: 'Tax Type 1' }, { name: 'Tax Type 2' }];

      model.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockTaxTypes),
      } as any);

      const result = await service.findAll();
      expect(result).toEqual(mockTaxTypes);
      expect(model.find).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a tax type by id', async () => {
      const mockTaxType = { name: 'Tax Type 1' };
      const id = '507f1f77bcf86cd799439011';

      model.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockTaxType),
      } as any);

      const result = await service.findById(id);
      expect(result).toEqual(mockTaxType);
      expect(model.findById).toHaveBeenCalledWith(id);
    });

    it('should return null if tax type not found', async () => {
      const id = '507f1f77bcf86cd799439011';

      model.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const result = await service.findById(id);
      expect(result).toBeNull();
      expect(model.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('findByName', () => {
    it('should return a tax type by name', async () => {
      const mockTaxType = { name: 'any_name' };
      const name = 'any_name';

      model.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockTaxType),
      } as any);

      const result = await service.findByName(name);
      expect(result).toEqual(mockTaxType);
      expect(model.findOne).toHaveBeenCalledWith({ name });
    });

    it('should return null if tax type not found by name', async () => {
      const name = 'nonexistent_name';

      model.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const result = await service.findByName(name);
      expect(result).toBeNull();
      expect(model.findOne).toHaveBeenCalledWith({ name });
    });
  });

  describe('create', () => {
    it('should create a new tax type', async () => {
      const createTaxTypeDto = { name: 'any_name' };
      const mockTaxType = { _id: '507f1f77bcf86cd799439011', ...createTaxTypeDto } as any;

      model.create.mockResolvedValue(mockTaxType);

      const result = await service.create(createTaxTypeDto);
      expect(result).toEqual(mockTaxType);
      expect(model.create).toHaveBeenCalledWith(createTaxTypeDto);
    });

    it('should throw an error if creation fails', async () => {
      const createTaxTypeDto = { name: 'any_name' };

      model.create.mockRejectedValue(new Error());

      await expect(service.create(createTaxTypeDto)).rejects.toThrow();
      expect(model.create).toHaveBeenCalledWith(createTaxTypeDto);
    });

    it('should throw an error if tax type name already exists', async () => {
      const createTaxTypeDto = { name: 'existing_name' };

      model.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ name: 'existing_name' }),
      } as any);

      await expect(service.create(createTaxTypeDto)).rejects.toThrow(BadRequestException);
      expect(model.findOne).toHaveBeenCalledWith({ name: createTaxTypeDto.name });
    });
  });

  describe('update', () => {
    it('should update a tax type', async () => {
      const updateTaxTypeDto = { name: 'updated_name' };
      const id = '507f1f77bcf86cd799439011';
      const mockTaxType = { _id: id, ...updateTaxTypeDto } as any;

      model.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      model.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ _id: id }),
      } as any);

      model.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockTaxType),
      } as any);

      const result = await service.update(id, updateTaxTypeDto);
      expect(result).toEqual(mockTaxType);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(id, updateTaxTypeDto, { new: true });
    });

    it('should throw an error if tax type not found', async () => {
      const updateTaxTypeDto = { name: 'updated_name' };
      const id = '507f1f77bcf86cd799439011';

      model.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      await expect(service.update(id, updateTaxTypeDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw an error if tax type name already exists', async () => {
      const updateTaxTypeDto = { name: 'existing_name' };
      const id = '507f1f77bcf86cd799439011';

      model.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ _id: id }),
      } as any);

      model.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ name: 'existing_name' }),
      } as any);

      await expect(service.update(id, updateTaxTypeDto)).rejects.toThrow(BadRequestException);
      expect(model.findOne).toHaveBeenCalledWith({ name: updateTaxTypeDto.name });
    });

    it('should throw an error if update fails', async () => {
      const updateTaxTypeDto = { name: 'updated_name' };
      const id = '507f1f77bcf86cd799439011';

      model.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ _id: id }),
      } as any);

      model.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      model.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockRejectedValue(new Error()),
      } as any);

      await expect(service.update(id, updateTaxTypeDto)).rejects.toThrow();
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(id, updateTaxTypeDto, { new: true });
    });
  });
});
