import { BadRequestException } from '@nestjs/common';
import { MongoIdValidationPipe } from './mongo-id-validation.pipe';

describe('MongoIdValidationPipe', () => {
  let pipe: MongoIdValidationPipe;

  beforeEach(() => {
    pipe = new MongoIdValidationPipe();
  });

  it('should return valid ObjectId', () => {
    const validId = '507f1f77bcf86cd799439011';
    expect(pipe.transform(validId, {} as any)).toBe(validId);
  });

  it('should throw BadRequestException for invalid ObjectId', () => {
    const invalidId = 'invalid-id';
    expect(() => pipe.transform(invalidId, {} as any)).toThrow(
      BadRequestException,
    );
  });
});
