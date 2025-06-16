import { IsMongoId, IsNotEmpty, IsOptional, IsString, Max, MaxLength } from 'class-validator';

export class CreateClaimDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  objective: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  summary: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  recoverable_period: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  recoverable_value: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  taxType: string;

  @IsString()
  @IsOptional()
  @IsMongoId()
  relatedQuestion?: string;
}
