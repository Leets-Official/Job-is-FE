import { useState } from 'react';
import { useNavigate } from 'react-router';
import ProfileAptitudeTestQuestionnaire from '@/features/profile/components/ProfileAptitudeTestQuestionnaire';
import ProfileAptitudeTestResult from '@/features/profile/components/ProfileAptitudeTestResult';
import ProfileAptitudeTestStart from '@/features/profile/components/ProfileAptitudeTestStart';
import {
  APTITUDE_QUESTIONS,
  type AptitudeChoiceValue,
  type AptitudeQuestion,
} from '@/features/profile/profileAptitudeQuestions';

function shuffleQuestions(questions: AptitudeQuestion[]) {
  const shuffledQuestions = [...questions];

  for (let index = shuffledQuestions.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledQuestions[index], shuffledQuestions[randomIndex]] = [
      shuffledQuestions[randomIndex],
      shuffledQuestions[index],
    ];
  }

  return shuffledQuestions;
}

export default function ProfileAptitudeTestPage() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<'start' | 'questions' | 'result'>('start');
  const [questions, setQuestions] = useState<AptitudeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<number, AptitudeChoiceValue>>>({});

  const startQuestionnaire = () => {
    setQuestions(shuffleQuestions(APTITUDE_QUESTIONS));
    setAnswers({});
    setCurrentIndex(0);
    setScreen('questions');
  };

  const exitQuestionnaire = () => {
    setScreen('start');
    setCurrentIndex(0);
  };

  const moveToPrevious = () => {
    if (currentIndex === 0) {
      exitQuestionnaire();
      return;
    }

    setCurrentIndex((previous) => previous - 1);
  };

  const selectAnswer = (answer: AptitudeChoiceValue) => {
    const currentQuestion = questions[currentIndex];
    setAnswers((previous) => ({ ...previous, [currentQuestion.questionNo]: answer }));

    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((previous) => previous + 1);
      return;
    }

    setScreen('result');
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-gray-50 px-5 py-12">
      {screen === 'questions' ? (
        <ProfileAptitudeTestQuestionnaire
          questions={questions}
          currentIndex={currentIndex}
          selectedAnswer={answers[questions[currentIndex].questionNo]}
          onSelect={selectAnswer}
          onPrevious={moveToPrevious}
          onSkip={moveToNextQuestion}
        />
      ) : screen === 'result' ? (
        <ProfileAptitudeTestResult
          onApply={() => navigate('/profile')}
          onRetry={startQuestionnaire}
        />
      ) : (
        <ProfileAptitudeTestStart onStart={startQuestionnaire} />
      )}
    </div>
  );
}
