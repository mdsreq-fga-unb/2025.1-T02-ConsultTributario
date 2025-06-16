import { Test, TestingModule } from '@nestjs/testing';
import { TaxTypesController } from './tax-types.controller';
import { TaxTypesService } from './tax-types.service';

const mockTaxType = {
  _id: '507f1f77bcf86cd799439011',
  name: 'any_name',
};

const taxTypesServiceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
};

describe('TaxTypesController', () => {
  let controller: TaxTypesController;
  let service: TaxTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxTypesController],
      providers: [
        {
          provide: TaxTypesService,
          useValue: taxTypesServiceMock,
        },
      ],
    }).compile();

    controller = module.get<TaxTypesController>(TaxTypesController);
    service = module.get<TaxTypesService>(TaxTypesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tax types', async () => {
      const result = [mockTaxType];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new tax type', async () => {
      const createTaxTypeDto = { name: 'New Tax Type' };
      jest.spyOn(service, 'create').mockResolvedValue(mockTaxType);

      expect(await controller.create(createTaxTypeDto)).toBe(mockTaxType);
      expect(service.create).toHaveBeenCalledWith(createTaxTypeDto);
    });

    it('should throw if taxTypesService throws', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new Error());

      await expect(controller.create({ name: 'any_name' })).rejects.toThrow();
      expect(service.create).toHaveBeenCalledWith({ name: 'any_name' });
    });
  });

  describe('update', () => {
    it('should update an existing tax type', async () => {
      const updateTaxTypeDto = { name: 'Updated Tax Type' };
      jest.spyOn(service, 'update').mockResolvedValue(mockTaxType);

      expect(await controller.update('valid_id', updateTaxTypeDto)).toBe(mockTaxType);
      expect(service.update).toHaveBeenCalledWith('valid_id', updateTaxTypeDto);
    });

    it('should throw if taxTypesService throws', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new Error());

      await expect(controller.update('valid_id', { name: 'any_name' })).rejects.toThrow();
      expect(service.update).toHaveBeenCalledWith('valid_id', { name: 'any_name' });
    });
  });
});
