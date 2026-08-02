import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import {
  applyQuizResult,
  getQuizQuestions,
  getQuizResult,
  saveQuizAnswer,
  type QuizQuestionsResponse,
  type QuizSource,
} from '@/api/quiz';
import { Alert, Spinner } from '@/components/feedback';
import ProfileAptitudeTestQuestionnaire from '@/features/profile/components/ProfileAptitudeTestQuestionnaire';
import ProfileAptitudeTestResult from '@/features/profile/components/ProfileAptitudeTestResult';
import ProfileAptitudeTestStart from '@/features/profile/components/ProfileAptitudeTestStart';

type QuizScreen = 'start' | 'questions' | 'result';

function getQuizSource(value: string | null): QuizSource {
  return value === 'ONBOARDING' ? 'ONBOARDING' : 'PROFILE';
}

export default function QuizPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const source = getQuizSource(searchParams.get('source'));
  const [screen, setScreen] = useState<QuizScreen>('start');
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [answerError, setAnswerError] = useState<string>();
  const [applyError, setApplyError] = useState<string>();

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

  const exitQuestionnaire = () => {
    setCurrentIndex(null);
    setAnswerError(undefined);
    setScreen('start');
  };

  const startQuestionnaire = () => {
    setAnswerError(undefined);
    setApplyError(undefined);
    setCurrentIndex(null);
    setScreen('questions');
  };

  const moveToPrevious = () => {
    if (activeQuestionIndex === 0) {
      exitQuestionnaire();
      return;
    }

    setCurrentIndex(activeQuestionIndex - 1);
  };

  const skipQuestion = () => {
    const quiz = quizQuestionsQuery.data;
    if (!quiz) return;

    if (activeQuestionIndex < quiz.questions.length - 1) {
      setCurrentIndex(activeQuestionIndex + 1);
      return;
    }

    navigate(source === 'ONBOARDING' ? '/onboarding' : '/profile');
  };

  const selectAnswer = async (choiceValue: number) => {
    const quiz = quizQuestionsQuery.data;
    const currentQuestion = quiz?.questions[activeQuestionIndex];
    if (!quiz || !currentQuestion) return;

    setAnswerError(undefined);

    try {
      const savedAnswer = await saveAnswerMutation.mutateAsync({
        testId: quiz.testId,
        questionNo: currentQuestion.questionNo,
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
            question.questionNo === currentQuestion.questionNo
              ? { ...question, selectedChoiceValue: choiceValue }
              : question,
          ),
        };
      });

      if (savedAnswer.completed) {
        setScreen('result');
        return;
      }

      if (activeQuestionIndex < quiz.questions.length - 1) {
        setCurrentIndex(activeQuestionIndex + 1);
      }
    } catch {
      setAnswerError('답변을 저장하지 못했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  const applyResult = async () => {
    const quiz = quizQuestionsQuery.data;
    if (!quiz) return;

    setApplyError(undefined);

    try {
      await applyResultMutation.mutateAsync(quiz.testId);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['profile'] }),
        queryClient.invalidateQueries({ queryKey: ['profileDraft'] }),
      ]);
      navigate(source === 'ONBOARDING' ? '/onboarding' : '/profile');
    } catch {
      setApplyError('결과를 프로필에 반영하지 못했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  const retryQuiz = async () => {
    setApplyError(undefined);
    await queryClient.invalidateQueries({ queryKey: ['quizQuestions', source] });
    setCurrentIndex(null);
    setScreen('questions');
  };

  const quiz = quizQuestionsQuery.data;
  const firstUnansweredIndex = quiz?.questions.findIndex(
    (question) =>
      question.selectedChoiceValue === null || question.selectedChoiceValue === undefined,
  );
  const activeQuestionIndex =
    currentIndex ??
    (firstUnansweredIndex === undefined || firstUnansweredIndex < 0 ? 0 : firstUnansweredIndex);
  const isShowingResult =
    screen === 'result' || (screen === 'questions' && quiz?.completed === true);

  return (
    <div className="flex flex-1 items-center justify-center bg-gray-50 px-5 py-12">
      {isShowingResult ? (
        quizResultQuery.isPending ? (
          <section className="flex min-h-74 w-full max-w-190 items-center justify-center rounded-md border border-gray-200 bg-white p-6">
            <Spinner />
          </section>
        ) : quizResultQuery.isError || !quizResultQuery.data ? (
          <section className="w-full max-w-190 rounded-md border border-gray-200 bg-white p-6">
            <Alert variant="danger" size="slim">
              퀴즈 결과를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
            </Alert>
          </section>
        ) : (
          <ProfileAptitudeTestResult
            resultName={quizResultQuery.data.resultType.name}
            resultSummary={quizResultQuery.data.resultType.summary}
            resultTags={quizResultQuery.data.resultTags}
            onApply={() => void applyResult()}
            onRetry={() => void retryQuiz()}
            isApplying={applyResultMutation.isPending}
            errorMessage={applyError}
          />
        )
      ) : screen === 'questions' ? (
        quizQuestionsQuery.isPending ? (
          <section className="flex min-h-74 w-full max-w-190 items-center justify-center rounded-md border border-gray-200 bg-white p-6">
            <Spinner />
          </section>
        ) : quizQuestionsQuery.isError || !quiz || quiz.questions.length === 0 ? (
          <section className="w-full max-w-190 rounded-md border border-gray-200 bg-white p-6">
            <Alert variant="danger" size="slim">
              퀴즈 문항을 불러오지 못했어요. 잠시 후 다시 시도해주세요.
            </Alert>
          </section>
        ) : (
          <div className="flex w-full max-w-190 flex-col gap-3">
            <ProfileAptitudeTestQuestionnaire
              questions={quiz.questions}
              currentIndex={activeQuestionIndex}
              selectedAnswer={quiz.questions[activeQuestionIndex]?.selectedChoiceValue}
              isSavingAnswer={saveAnswerMutation.isPending}
              onSelect={(choiceValue) => void selectAnswer(choiceValue)}
              onPrevious={moveToPrevious}
              onSkip={skipQuestion}
            />
            {answerError && (
              <Alert variant="danger" size="slim">
                {answerError}
              </Alert>
            )}
          </div>
        )
      ) : (
        <ProfileAptitudeTestStart onStart={startQuestionnaire} />
      )}
    </div>
  );
}
