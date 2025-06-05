import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClaimDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  objective: string;

  @IsString()
  @IsNotEmpty()
  summary: string;

  @IsString()
  @IsNotEmpty()
  recoverable_period: string;

  @IsString()
  @IsNotEmpty()
  recoverable_value: string;

  @IsString()
  @IsOptional()
  @IsMongoId()
  relatedQuestion?: string;
}
