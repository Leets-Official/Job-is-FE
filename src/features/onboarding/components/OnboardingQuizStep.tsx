import CarouselArrow from '@/components/common/CarouselArrow';
import CarouselIndicator from '@/components/common/CarouselIndicator';
import { cn } from '@/utils/cn';

const QUESTIONS = [
  {
    question: '회사의 안정성과 성장 가능성 중\n더 중요한 것은 무엇인가요?',
    options: ['안정적인 회사가 좋다', '빠르게 성장하는 것이 좋다'],
  },
];

const TOTAL_QUESTIONS = 10;

interface OnboardingQuizStepProps {
  currentIndex: number;
  selectedOption?: string;
  onBack: () => void;
  onSelect: (answer: string, isLastQuestion: boolean) => void;
  onSkip: () => void;
}

export default function OnboardingQuizStep({
  currentIndex,
  selectedOption,
  onBack,
  onSelect,
  onSkip,
}: OnboardingQuizStepProps) {
  const question = QUESTIONS[currentIndex];

  if (!question) {
    return null;
  }

  return (
    <div className="flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden bg-gray-50">
      <div className="flex w-190 flex-col items-center gap-5 overflow-hidden rounded-md border border-gray-200 bg-white p-6">
        <div className="flex w-174 items-center justify-center overflow-hidden rounded-xs">
          <div className="flex w-157 items-center gap-[205px] rounded-xs bg-white p-2.5">
            <CarouselArrow direction="left" onClick={onBack} />
            <p className="text-heading-medium font-semibold whitespace-nowrap text-text-primary">
              Q&A {currentIndex + 1}
            </p>
          </div>
        </div>

        <p className="text-center text-heading-xlarge leading-[1.2] font-bold whitespace-pre-line text-text-primary">
          {question.question}
        </p>

        {question.options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={selectedOption === option}
            onClick={() => onSelect(option, currentIndex === QUESTIONS.length - 1)}
            className={cn(
              'flex w-144 cursor-pointer items-center justify-center overflow-hidden rounded-xs border border-solid p-6 text-center text-label-medium font-medium transition-colors',
              selectedOption === option
                ? 'border-primary-400 bg-primary-50 text-text-primary'
                : 'border-gray-400 bg-white text-text-secondary',
            )}
          >
            {option}
          </button>
        ))}

        <div className="flex w-174 items-center justify-center overflow-hidden rounded-xs">
          <div className="flex w-157 items-center gap-95 rounded-xs bg-white p-2.5">
            <CarouselIndicator variant="dot" total={TOTAL_QUESTIONS} activeIndex={currentIndex} />
            <button
              type="button"
              onClick={onSkip}
              className="cursor-pointer text-label-large font-medium whitespace-nowrap text-text-tertiary underline decoration-solid decoration-from-font [text-underline-position:from-font]"
            >
              건너뛰기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
