import { useMemo } from 'react';
import useSWR from 'swr';

import { IQuestion, IQuestionCreate, IQuestionUpdate } from '../types/question';
import axios, { endpoints, fetcher } from '../utils/axios';

export function useGetQuestions() {
  const { data, isLoading, error, mutate } = useSWR(endpoints.question.list, fetcher);

  return useMemo(
    () => ({
      questions: (data as IQuestion[]) || [],
      questionsLoading: isLoading,
      questionsError: error,
      questionsEmpty: !isLoading && !data?.length,
      questionsValidating: isLoading,
      refreshQuestions: mutate,
    }),
    [data, isLoading, error, mutate]
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

export async function deleteQuestion(questionId: string) {
  const response = await axios.delete(endpoints.question.delete(questionId));
  return response.data;
}
