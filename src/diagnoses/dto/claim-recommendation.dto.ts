import { ClaimDto } from '@/claims/dto/claim.dto';
import { Expose, Type } from 'class-transformer';
import { DiagnosisDtoWithoutQuestionResponses } from './diagnosis.dto';

export class ClaimRecommendationResponseDto {
  @Expose()
  @Type(() => DiagnosisDtoWithoutQuestionResponses)
  diagnosis: DiagnosisDtoWithoutQuestionResponses;

  @Expose()
  relevantAnswersCount: number;

  @Expose()
  @Type(() => ClaimDto)
  recommendedClaims: ClaimDto[];
}
