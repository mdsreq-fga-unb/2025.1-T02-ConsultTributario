import { ClaimRecommendationResponseDto } from '@/diagnoses/dto/claim-recommendation.dto';
import { CreateDiagnosisDto } from '@/diagnoses/dto/create-diagnosis.dto';
import { Diagnosis } from '@/diagnoses/schema/diagnosis.schema';

export interface IDiagnosesService {
  create(data: Partial<CreateDiagnosisDto>): Promise<Diagnosis>;
  findAll(): Promise<Diagnosis[]>;
  findById(id: string): Promise<Diagnosis>;
  delete(id: string): Promise<void>;
  getRecommendations(id: string): Promise<ClaimRecommendationResponseDto>;
}
