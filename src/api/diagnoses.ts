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
  const { data, isLoading, error, mutate, isValidating } = useSWR(
    id ? endpoints.diagnosticos.recommendations(id) : null,
    fetcher
  );

  const isConnectionError =
    error?.code === 'ERR_NETWORK' || error?.message?.includes('ERR_CONNECTION_REFUSED');

  if (isConnectionError) {
    error.message = 'Erro de conexão. Verifique sua internet ou tente novamente mais tarde.';
  }
  return useMemo(
    () => ({
      recommendations: data as IClaimRecommendationResponseDto,
      recommendationsLoading: isLoading || isValidating,
      recommendationsError: error,
      recommendationsEmpty: !isLoading && !data?.length,
      recommendationsValidating: isValidating,
      refreshRecommendations: mutate,
    }),
    [data, isLoading, error, mutate, isValidating]
  );
}

export function useGetDiagnoses() {
  const { data, isLoading, error, mutate, isValidating } = useSWR(
    endpoints.diagnosticos.list,
    fetcher
  );

  const isConnectionError =
    error?.code === 'ERR_NETWORK' || error?.message?.includes('ERR_CONNECTION_REFUSED');

  if (isConnectionError) {
    error.message = 'Erro de conexão. Verifique sua internet ou tente novamente mais tarde.';
  }
  return useMemo(
    () => ({
      diagnoses: (data as IDiagnosis[]) || [],
      diagnosesLoading: isLoading || isValidating,
      diagnosesError: error,
      diagnosesEmpty: !isLoading && !data?.length,
      diagnosesValidating: isValidating,
      refreshDiagnoses: mutate,
    }),
    [data, isLoading, error, mutate, isValidating]
  );
}

export function useGetDiagnosis(id: string) {
  const { data, isLoading, error, mutate, isValidating } = useSWR(
    id ? endpoints.diagnosticos.detail(id) : null,
    fetcher
  );

  const isConnectionError =
    error?.code === 'ERR_NETWORK' || error?.message?.includes('ERR_CONNECTION_REFUSED');

  if (isConnectionError) {
    error.message = 'Erro de conexão. Verifique sua internet ou tente novamente mais tarde.';
  }

  return useMemo(
    () => ({
      diagnosis: (data as IDiagnosis) || null,
      diagnosisLoading: isLoading || isValidating,
      diagnosisError: error,
      refreshDiagnosis: mutate,
      diagnosisValidating: isValidating,
      diagnosisEmpty: !isLoading && !data && !isValidating,
    }),
    [data, isLoading, error, mutate, isValidating]
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
