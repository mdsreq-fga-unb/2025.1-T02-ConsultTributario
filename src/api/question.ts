import { useMemo } from 'react';
import useSWR from 'swr';

import { IQuestion, IQuestionCreate, IQuestionUpdate } from '../types/question';
import axios, { endpoints, fetcher } from '../utils/axios';

export function useGetQuestions() {
  const { data, isLoading, error, mutate, isValidating } = useSWR(endpoints.question.list, fetcher);

  const isConnectionError =
    error?.code === 'ERR_NETWORK' || error?.message?.includes('ERR_CONNECTION_REFUSED');

  if (isConnectionError) {
    error.message = 'Erro de conexão. Verifique sua internet ou tente novamente mais tarde.';
  }
  return useMemo(
    () => ({
      questions: (data as IQuestion[]) || [],
      questionsLoading: isLoading || isValidating,
      questionsError: error,
      questionsEmpty: !isValidating && !isLoading && !data?.length,
      questionsValidating: isValidating,
      refreshQuestions: mutate,
    }),
    [data, isLoading, error, mutate, isValidating]
  );
}

export async function createQuestion(questionData: IQuestionCreate) {
  const response = await axios.post(endpoints.question.create, questionData);
  return response.data;
}

export async function updateQuestion(questionId: string, questionData: Partial<IQuestionUpdate>) {
  const response = await axios.patch(endpoints.question.update(questionId), questionData);
  return response.data;
}
