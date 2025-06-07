import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { ERROR_MESSAGES } from '../constants/app.constants';

@Injectable()
export class MongoIdValidationPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_ID);
    }
    return value;
  }
}
