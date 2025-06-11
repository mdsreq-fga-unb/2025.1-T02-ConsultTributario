import { useMemo } from 'react';
import useSWR from 'swr';

import { IClaim, ICreateClaim, IUpdateClaim } from '@/types/claim';

import axios, { endpoints, fetcher } from '../utils/axios';

export function useGetClaims() {
  const { data, isLoading, error, mutate, isValidating } = useSWR(endpoints.teses.list, fetcher);

  const isConnectionError =
    error?.code === 'ERR_NETWORK' || error?.message?.includes('ERR_CONNECTION_REFUSED');

  if (isConnectionError) {
    error.message = 'Erro de conexão. Verifique sua internet ou tente novamente mais tarde.';
  }
  return useMemo(
    () => ({
      claims: (data as IClaim[]) || [],
      claimsLoading: isLoading || isValidating,
      claimsError: error,
      claimsEmpty: !isLoading && !isValidating && !data?.length,
      claimsValidating: isValidating,
      refreshClaims: mutate,
    }),
    [data, isLoading, error, mutate, isValidating]
  );
}

export async function createClaim(claimData: ICreateClaim) {
  const response = await axios.post(endpoints.teses.create, claimData);
  return response.data;
}

export async function updateClaim(claimId: string, claimData: Partial<IUpdateClaim>) {
  const response = await axios.patch(endpoints.teses.update(claimId), claimData);
  return response.data;
}
