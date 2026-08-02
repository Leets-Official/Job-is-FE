import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  applyQuizResult,
  getQuizQuestions,
  getQuizResult,
  saveQuizAnswer,
  type QuizQuestionsResponse,
  type QuizSource,
} from '@/api/quiz';

type QuizScreen = 'start' | 'questions' | 'result';

export default function useQuizApi(source: QuizSource, screen: QuizScreen) {
  const queryClient = useQueryClient();
  const quizQuestionsQuery = useQuery({
    queryKey: ['quizQuestions', source],
    queryFn: () => getQuizQuestions(source),
    enabled: screen === 'questions',
  });
  const quizResultQuery = useQuery({
    queryKey: ['quizResult', quizQuestionsQuery.data?.testId],
    queryFn: () => getQuizResult(quizQuestionsQuery.data?.testId as number),
    enabled:
      (screen === 'result' ||
        (screen === 'questions' && quizQuestionsQuery.data?.completed === true)) &&
      quizQuestionsQuery.data?.testId !== undefined,
  });
  const saveAnswerMutation = useMutation({ mutationFn: saveQuizAnswer });
  const applyResultMutation = useMutation({ mutationFn: applyQuizResult });

  const saveAnswer = async (testId: number, questionNo: number, choiceValue: number) => {
    const savedAnswer = await saveAnswerMutation.mutateAsync({
      testId,
      questionNo,
      choiceValue,
    });

    queryClient.setQueryData<QuizQuestionsResponse>(['quizQuestions', source], (previous) => {
      if (!previous) return previous;

      return {
        ...previous,
        answeredCount: savedAnswer.answeredCount,
        totalCount: savedAnswer.totalCount,
        completed: savedAnswer.completed,
        questions: previous.questions.map((question) =>
          question.questionNo === questionNo
            ? { ...question, selectedChoiceValue: choiceValue }
            : question,
        ),
      };
    });

    return savedAnswer;
  };

  const applyResult = async (testId: number) => {
    await applyResultMutation.mutateAsync(testId);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['profile'] }),
      queryClient.invalidateQueries({ queryKey: ['profileDraft'] }),
    ]);
  };

  const retryQuiz = async () => {
    await quizQuestionsQuery.refetch();
  };

  return {
    quizQuestionsQuery,
    quizResultQuery,
    saveAnswer,
    applyResult,
    retryQuiz,
    isSavingAnswer: saveAnswerMutation.isPending,
    isApplyingResult: applyResultMutation.isPending,
  };
}
