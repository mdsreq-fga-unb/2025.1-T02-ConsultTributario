import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

export function Serialize<T extends ClassConstructor<unknown>>(dto: T) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor<T extends ClassConstructor<unknown>>
  implements NestInterceptor
{
  constructor(private readonly dto: T) {}

  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>
  ): Observable<any> {
    return handler.handle().pipe(
      map((data) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      })
    );
  }
}
