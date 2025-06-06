import { useMemo } from 'react';
import useSWR from 'swr';

import { IClaim, ICreateClaim, IUpdateClaim } from '@/types/claim';

import axios, { endpoints, fetcher } from '../utils/axios';

export function useGetClaims() {
  const { data, isLoading, error, mutate } = useSWR(endpoints.teses.list, fetcher);

  return useMemo(
    () => ({
      claims: (data as IClaim[]) || [],
      claimsLoading: isLoading,
      claimsError: error,
      claimsEmpty: !isLoading && !data?.length,
      claimsValidating: isLoading,
      refreshClaims: mutate,
    }),
    [data, isLoading, error, mutate]
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

export async function deleteClaim(claimId: string) {
  const response = await axios.delete(endpoints.teses.delete(claimId));
  return response.data;
}
