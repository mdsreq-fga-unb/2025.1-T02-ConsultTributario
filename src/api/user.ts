import { useMemo } from 'react';
import useSWR from 'swr';

import { IUser } from '../types/auth';
import axios, { endpoints, fetcher } from '../utils/axios';

// ----------------------------------------------------------------------

export function useGetUsers() {
  const { data, isLoading, error, mutate } = useSWR(endpoints.user.list, fetcher);

  return useMemo(
    () => ({
      users: (data as IUser[]) || [],
      usersLoading: isLoading,
      usersError: error,
      usersEmpty: !isLoading && !data?.length,
      usersValidating: isLoading,
      refreshUsers: mutate,
    }),
    [data, isLoading, error, mutate]
  );
}

export function useGetUser(userId: string) {
  const { data, isLoading, error, mutate } = useSWR(
    userId ? endpoints.user.details(userId) : null,
    fetcher
  );

  return useMemo(
    () => ({
      user: data as IUser,
      userLoading: isLoading,
      userError: error,
      refreshUser: mutate,
    }),
    [data, isLoading, error, mutate]
  );
}

// ----------------------------------------------------------------------

export async function createUser(userData: Partial<IUser>) {
  const response = await axios.post(endpoints.user.create, userData);
  return response.data;
}

export async function updateUser(userId: string, userData: Partial<IUser>) {
  const response = await axios.patch(endpoints.user.update(userId), userData);
  return response.data;
}

export async function deleteUser(userId: string) {
  const response = await axios.delete(endpoints.user.delete(userId));
  return response.data;
}
