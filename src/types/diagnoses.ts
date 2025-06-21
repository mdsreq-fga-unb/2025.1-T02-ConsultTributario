import { IClaim } from './claim';

export type AnswerType = 'yes' | 'no' | 'dont_know' | string;

export interface IQuestionResponse {
  questionId: string;
  answer: AnswerType;
}

export interface IDiagnosis {
  _id: string;
  createdAt: string;
  updatedAt: string;
  clientName: string;
  questionResponses: IQuestionResponse[];
}

export interface IDiagnosisWithoutQuestionResponses {
  _id: string;
  createdAt: string;
  updatedAt: string;
  clientName: string;
}

export interface ICreateDiagnosis {
  clientName: string;
  questionResponses: IQuestionResponse[];
}

export interface IUpdateDiagnosis {
  clientName?: string;
  questionResponses?: IQuestionResponse[];
}

export interface IClaimRecommendationResponseDto {
  diagnosis: IDiagnosisWithoutQuestionResponses;
  relevantAnswersCount: number;
  recommendedClaims: IClaim[];
}
