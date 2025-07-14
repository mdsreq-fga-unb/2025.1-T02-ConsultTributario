import { ClaimRecommendationResponseDto } from '@/diagnoses/dto/claim-recommendation.dto';
import { CreateDiagnosisDto } from '@/diagnoses/dto/create-diagnosis.dto';
import { Diagnosis } from '@/diagnoses/schema/diagnosis.schema';

export interface IDiagnosesService {
  create(data: Partial<CreateDiagnosisDto>, userId: string): Promise<Diagnosis>;
  findAll(userId: string): Promise<Diagnosis[]>;
  findById(id: string, userId: string): Promise<Diagnosis>;
  delete(id: string, userId: string): Promise<void>;
  getRecommendations(id: string, userId: string): Promise<ClaimRecommendationResponseDto>;
}
