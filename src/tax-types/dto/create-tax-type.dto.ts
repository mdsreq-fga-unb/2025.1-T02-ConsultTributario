import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTaxTypeDto {
  @ApiProperty({
    description: 'Nome do tipo de tributo',
    example: 'ICMS',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  name: string;
}
