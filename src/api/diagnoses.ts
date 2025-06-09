import { useMemo } from 'react';
import useSWR from 'swr';

import {
  IClaimRecommendationResponseDto,
  ICreateDiagnosis,
  IDiagnosis,
  IDiagnosisWithoutQuestionResponses,
  IUpdateDiagnosis,
} from '@/types/diagnoses';

import axios, { endpoints, fetcher } from '../utils/axios';

export function useGetClaimRecommendations(id: string) {
  const { data, isLoading, error, mutate } = useSWR(
    id ? endpoints.diagnosticos.recommendations(id) : null,
    fetcher
  );

  return useMemo(
    () => ({
      recommendations: data as IClaimRecommendationResponseDto,
      recommendationsLoading: isLoading,
      recommendationsError: error,
      recommendationsEmpty: !isLoading && !data?.length,
      recommendationsValidating: isLoading,
      refreshRecommendations: mutate,
    }),
    [data, isLoading, error, mutate]
  );
}

export function useGetDiagnoses() {
  const { data, isLoading, error, mutate } = useSWR(endpoints.diagnosticos.list, fetcher);

  return useMemo(
    () => ({
      diagnoses: (data as IDiagnosis[]) || [],
      diagnosesLoading: isLoading,
      diagnosesError: error,
      diagnosesEmpty: !isLoading && !data?.length,
      diagnosesValidating: isLoading,
      refreshDiagnoses: mutate,
    }),
    [data, isLoading, error, mutate]
  );
}

export function useGetDiagnosis(id: string) {
  const { data, isLoading, error, mutate } = useSWR(
    id ? endpoints.diagnosticos.detail(id) : null,
    fetcher
  );

  return useMemo(
    () => ({
      diagnosis: (data as IDiagnosis) || null,
      diagnosisLoading: isLoading,
      diagnosisError: error,
      refreshDiagnosis: mutate,
    }),
    [data, isLoading, error, mutate]
  );
}

export async function createDiagnosis(
  diagnosisData: ICreateDiagnosis
): Promise<IDiagnosisWithoutQuestionResponses> {
  const response = await axios.post(endpoints.diagnosticos.create, diagnosisData);
  return response.data;
}

export async function updateDiagnosis(
  diagnosisId: string,
  diagnosisData: Partial<IUpdateDiagnosis>
) {
  const response = await axios.patch(endpoints.diagnosticos.detail(diagnosisId), diagnosisData);
  return response.data;
}

export async function deleteDiagnosis(diagnosisId: string) {
  const response = await axios.delete(endpoints.diagnosticos.detail(diagnosisId));
  return response.data;
}
