import { useState } from 'react';
import type { NotificationSnooze, NotificationSnoozeDuration } from '@/api/notification';
import useNotificationSnooze from '@/features/settings/hooks/useNotificationSnooze';
import useNotificationSnoozeCancel from '@/features/settings/hooks/useNotificationSnoozeCancel';
import { cn } from '@/utils/cn';

type PausePeriod = 7 | 30 | 'indefinite';

const PAUSE_OPTIONS: { label: string; value: PausePeriod }[] = [
  { label: '7일', value: 7 },
  { label: '30일', value: 30 },
  { label: '직접 해제', value: 'indefinite' },
];

const SNOOZE_DURATION_BY_PERIOD: Record<PausePeriod, NotificationSnoozeDuration> = {
  7: 'SEVEN_DAYS',
  30: 'THIRTY_DAYS',
  indefinite: 'INDEFINITE',
};

function getResumeDate(period: Exclude<PausePeriod, 'indefinite'>) {
  const resumeDate = new Date();
  resumeDate.setDate(resumeDate.getDate() + period);

  return new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
  }).format(resumeDate);
}

function getInitialPausePeriod(snooze: NotificationSnooze): PausePeriod | null {
  if (!snooze.snoozed) return null;
  if (snooze.indefinite) return 'indefinite';
  if (!snooze.until) return null;

  const until = new Date(snooze.until);
  if (Number.isNaN(until.getTime())) return null;

  const remainingDays = Math.ceil((until.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  return remainingDays <= 7 ? 7 : 30;
}

interface NotificationPauseCardProps {
  initialSnooze: NotificationSnooze;
}

export default function NotificationPauseCard({ initialSnooze }: NotificationPauseCardProps) {
  const [pausePeriod, setPausePeriod] = useState<PausePeriod | null>(() =>
    getInitialPausePeriod(initialSnooze),
  );
  const snoozeMutation = useNotificationSnooze();
  const snoozeCancelMutation = useNotificationSnoozeCancel();
  const isUpdating = snoozeMutation.isPending || snoozeCancelMutation.isPending;

  const handlePausePeriodChange = (nextPausePeriod: PausePeriod) => {
    const previousPausePeriod = pausePeriod;
    snoozeCancelMutation.reset();
    setPausePeriod(nextPausePeriod);
    snoozeMutation.mutate(
      { duration: SNOOZE_DURATION_BY_PERIOD[nextPausePeriod] },
      { onError: () => setPausePeriod(previousPausePeriod) },
    );
  };

  const handleSnoozeCancel = () => {
    const previousPausePeriod = pausePeriod;
    snoozeMutation.reset();
    setPausePeriod(null);
    snoozeCancelMutation.mutate(undefined, {
      onError: () => setPausePeriod(previousPausePeriod),
    });
  };

  const pauseMessage =
    pausePeriod === 'indefinite'
      ? '직접 다시 켤 때까지 쉬는 중이에요.'
      : pausePeriod
        ? `${getResumeDate(pausePeriod)}까지 쉬는 중이에요.`
        : '현재 알림을 정상적으로 받고 있어요.';

  return (
    <section className="flex flex-col gap-5 rounded-md border border-gray-200 bg-white p-6">
      <h2 className="text-heading-medium text-text-primary">잠시 쉬기(일시 정지)</h2>

      <div className="flex items-center justify-between gap-5 max-sm:flex-col max-sm:items-start">
        <p className="text-label-medium font-medium text-text-primary">
          받는 것을 잠깐 멈출 수 있어요
        </p>
        <div
          className="flex flex-wrap gap-2.5 px-2.5"
          role="radiogroup"
          aria-label="알림 일시정지 기간"
        >
          {PAUSE_OPTIONS.map((option) => (
            <button
              key={option.label}
              type="button"
              role="radio"
              aria-checked={pausePeriod === option.value}
              disabled={isUpdating}
              onClick={() => handlePausePeriodChange(option.value)}
              className={cn(
                'h-10 cursor-pointer rounded-full border border-gray-200 bg-white px-3 text-label-large font-normal text-text-primary transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-500 disabled:hover:bg-white',
                pausePeriod === option.value &&
                  'border-primary-600 bg-primary-600 hover:bg-primary-600',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {snoozeMutation.isError && (
        <p className="text-label-small font-medium text-danger-500" role="alert">
          알림 일시 정지를 설정하지 못했어요. 다시 시도해주세요.
        </p>
      )}

      {snoozeCancelMutation.isError && (
        <p className="text-label-small font-medium text-danger-500" role="alert">
          알림 일시 정지를 해제하지 못했어요. 다시 시도해주세요.
        </p>
      )}

      <div className="flex min-h-18 items-center justify-between gap-5 rounded-xs border border-dashed border-gray-400 bg-gray-200 p-6">
        <span className="text-label-medium font-medium text-text-tertiary">{pauseMessage}</span>
        {pausePeriod && (
          <button
            type="button"
            disabled={isUpdating}
            onClick={handleSnoozeCancel}
            className="shrink-0 cursor-pointer text-label-medium font-medium text-text-primary underline decoration-from-font [text-underline-position:from-font] disabled:cursor-not-allowed disabled:text-gray-500"
          >
            지금 다시 받기
          </button>
        )}
      </div>
    </section>
  );
}
