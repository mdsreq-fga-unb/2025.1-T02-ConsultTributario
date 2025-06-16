import { useMemo } from 'react';
import useSWR from 'swr';

import { ITaxType, ITaxTypeCreate, ITaxTypeUpdate } from '@/types/taxType';

import axios, { endpoints, fetcher } from '../utils/axios';

export function useGetTaxTypes() {
  const { data, isLoading, error, mutate, isValidating } = useSWR(endpoints.taxTypes.list, fetcher);

  const isConnectionError =
    error?.code === 'ERR_NETWORK' || error?.message?.includes('ERR_CONNECTION_REFUSED');

  if (isConnectionError) {
    error.message = 'Erro de conexão. Verifique sua internet ou tente novamente mais tarde.';
  }

  return useMemo(
    () => ({
      taxTypes: (data as ITaxType[]) || [],
      taxTypesLoading: isLoading || isValidating,
      taxTypesError: error,
      taxTypesEmpty: !isLoading && !isValidating && !data?.length,
      taxTypesValidating: isValidating,
      refreshTaxTypes: mutate,
    }),
    [data, isLoading, error, mutate, isValidating]
  );
}

export async function createTaxType(taxTypeData: ITaxTypeCreate) {
  const response = await axios.post(endpoints.taxTypes.create, taxTypeData);
  return response.data;
}

export async function updateTaxType(taxTypeId: string, taxTypeData: ITaxTypeUpdate) {
  const response = await axios.patch(endpoints.taxTypes.update(taxTypeId), taxTypeData);
  return response.data;
}
