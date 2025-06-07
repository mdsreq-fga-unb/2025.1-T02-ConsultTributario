import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsDateString, IsMongoId, IsOptional } from 'class-validator';

export abstract class BaseEntityDto {
  @ApiProperty({
    description: 'Entity ID',
    type: String,
    required: false,
  })
  @Expose()
  @Transform(({ obj }) => obj._id?.toString())
  @IsMongoId()
  @IsOptional()
  _id?: string;
}

export abstract class BaseTimestampDto extends BaseEntityDto {
  @ApiProperty({
    description: 'Creation date',
    type: Date,
    required: false,
  })
  @Expose()
  @IsDateString()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({
    description: 'Last update date',
    type: Date,
    required: false,
  })
  @Expose()
  @IsDateString()
  @IsOptional()
  updatedAt?: Date;
}
