import { useId, useState } from 'react';
import ToggleSwitch from '@/components/common/ToggleSwitch';
import { cn } from '@/utils/cn';

const DELIVERY_TIMES = ['07:30', '12:30', '18:30'];

export default function DailyBriefingSettingsCard() {
  const toggleId = useId();
  const [isEnabled, setIsEnabled] = useState(true);
  const [deliveryTime, setDeliveryTime] = useState('12:30');

  return (
    <section className="flex flex-col gap-5 rounded-md border border-gray-200 bg-white px-5 py-6">
      <h2 className="text-heading-medium text-text-primary">데일리 브리핑</h2>

      <div className="flex items-center justify-between gap-5">
        <h3 className="text-label-medium font-medium text-text-primary">브리핑 이메일 받기</h3>
        <ToggleSwitch
          id={toggleId}
          checked={isEnabled}
          onChange={(event) => setIsEnabled(event.target.checked)}
          aria-label="데일리 브리핑 이메일 받기"
        />
      </div>

      <div className="border-t border-gray-400 pt-5">
        <div className="flex items-center justify-between gap-5 max-sm:flex-col max-sm:items-start">
          <h3 className="text-label-medium font-medium text-text-primary">받을 시간</h3>
          <div
            className="flex flex-wrap gap-2.5 px-2.5"
            role="radiogroup"
            aria-label="브리핑 받을 시간"
          >
            {DELIVERY_TIMES.map((time) => (
              <button
                key={time}
                type="button"
                role="radio"
                aria-checked={deliveryTime === time}
                disabled={!isEnabled}
                onClick={() => setDeliveryTime(time)}
                className={cn(
                  'h-10 cursor-pointer rounded-full border border-gray-200 bg-white px-3 text-label-large font-normal text-text-primary transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-500',
                  deliveryTime === time && 'border-primary-600 bg-primary-600',
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-5 text-label-small font-medium text-text-tertiary">
          바꾸면 내일 아침부터 새 시간에 보내드려요.
        </p>
      </div>
    </section>
  );
}
