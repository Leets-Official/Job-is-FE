import ChevronLeftIcon from '@/assets/icons/icon-chevron-left.svg?react';
import type {
  AptitudeChoiceValue,
  AptitudeQuestion,
} from '@/features/profile/profileAptitudeQuestions';
import { cn } from '@/utils/cn';

export default function ProfileAptitudeTestQuestionnaire({
  questions,
  currentIndex,
  selectedAnswer,
  onSelect,
  onPrevious,
  onSkip,
}: {
  questions: AptitudeQuestion[];
  currentIndex: number;
  selectedAnswer?: AptitudeChoiceValue;
  onSelect: (answer: AptitudeChoiceValue) => void;
  onPrevious: () => void;
  onSkip: () => void;
}) {
  const question = questions[currentIndex];
  const questionNumber = currentIndex + 1;

  return (
    <section className="flex w-full max-w-190 flex-col items-center gap-5 overflow-hidden rounded-md border border-gray-200 bg-white p-6">
      <div className="grid w-full max-w-157 grid-cols-[64px_1fr_64px] items-center p-2.5">
        <button
          type="button"
          onClick={onPrevious}
          className="flex size-16 cursor-pointer items-center justify-center rounded-full border-2 border-gray-900 transition-colors hover:bg-gray-50"
          aria-label="이전 질문으로 돌아가기"
        >
          <ChevronLeftIcon className="size-8" aria-hidden="true" />
        </button>
        <p className="text-center text-heading-medium font-semibold text-text-primary">
          Q&amp;A {questionNumber}
        </p>
      </div>

      <h1 className="max-w-157 text-center text-heading-xlarge leading-[1.2] whitespace-pre-line text-text-primary">
        {question.prompt}
      </h1>

      <div className="flex w-full flex-col items-center gap-5">
        {question.options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={cn(
              'min-h-17.5 w-full max-w-144 cursor-pointer rounded-xs border border-gray-400 bg-white px-6 text-label-medium font-medium text-text-secondary transition-colors hover:border-primary-400 hover:bg-primary-50',
              selectedAnswer === option.value && 'border-primary-400 bg-primary-50',
            )}
            aria-pressed={selectedAnswer === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="flex w-full max-w-157 items-center justify-between p-2.5">
        <div
          className="flex h-10 items-center gap-1 rounded-full bg-white p-4"
          role="progressbar"
          aria-label="직무 성향 테스트 진행률"
          aria-valuenow={questionNumber}
          aria-valuemin={1}
          aria-valuemax={questions.length}
        >
          {questions.map((questionItem, index) => (
            <span
              key={questionItem.questionNo}
              className={cn(
                'size-2 rounded-full bg-gray-300',
                index === currentIndex && 'w-5 bg-primary-400',
              )}
              aria-hidden="true"
            />
          ))}
        </div>

        <button
          type="button"
          onClick={onSkip}
          className="cursor-pointer text-label-large font-medium text-text-tertiary underline decoration-solid decoration-from-font [text-underline-position:from-font] hover:text-text-secondary"
        >
          건너뛰기
        </button>
      </div>
    </section>
  );
}
