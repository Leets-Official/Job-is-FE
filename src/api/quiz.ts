import { client } from '@/api/client';
import type { ApiEnvelope } from '@/api/types';

export type QuizSource = 'ONBOARDING' | 'PROFILE';

export interface QuizChoice {
  choiceValue: number;
  content: string;
}

export interface QuizQuestion {
  questionNo: number;
  question: string;
  choices: QuizChoice[];
  selectedChoiceValue?: number | null;
}

export interface QuizQuestionsResponse {
  testId: number;
  source: QuizSource;
  completed: boolean;
  answeredCount: number;
  totalCount: number;
  questions: QuizQuestion[];
}

export interface QuizResult {
  testId: number;
  completed: boolean;
  answeredCount: number;
  totalCount: number;
  resultType: {
    code: string;
    name: string;
    summary: string;
  };
  resultTags: string[];
}

interface SaveQuizAnswerRequest {
  testId: number;
  questionNo: number;
  choiceValue: number;
}

interface SaveQuizAnswerResponse extends SaveQuizAnswerRequest {
  answeredCount: number;
  totalCount: number;
  completed: boolean;
}

export interface ApplyQuizResultResponse {
  testId: number;
  resultType: string;
  resultTags: string[];
  jobTestCompleted: boolean;
  applied: boolean;
}

export async function getQuizQuestions(source: QuizSource) {
  const { data } = await client.get<ApiEnvelope<QuizQuestionsResponse>>('/api/quiz/questions', {
    params: { source },
  });

  return data.data;
}

export async function saveQuizAnswer(request: SaveQuizAnswerRequest) {
  const { data } = await client.post<ApiEnvelope<SaveQuizAnswerResponse>>(
    '/api/quiz/answers',
    request,
  );

  return data.data;
}

export async function getQuizResult(testId: number) {
  const { data } = await client.get<ApiEnvelope<QuizResult>>('/api/quiz/result', {
    params: { testId },
  });

  return data.data;
}

export async function applyQuizResult(testId: number) {
  const { data } = await client.post<ApiEnvelope<ApplyQuizResultResponse>>(
    '/api/quiz/result/apply',
    { testId },
  );

  return data.data;
}
