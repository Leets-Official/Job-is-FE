import { type ComponentPropsWithoutRef } from 'react';
import ArrowRightIcon from '@/assets/icons/icon-arrow-right.svg?react';
import HashIcon from '@/assets/icons/icon-hash.svg?react';
import Button from '@/components/common/Button';
import { cn } from '@/utils/cn';

type IdentityProps = ComponentPropsWithoutRef<'section'> & {
  name: string;
  title: string;
  description?: string;
  avatarLabel?: string;
  tags?: string[];
  statusLabel?: string;
  actionLabel?: string;
  onAction?: () => void;
  avatarUrl?: string;
};

export default function Identity({
  className,
  name,
  title,
  description = '사용자 경험과 서비스 가치를 함께 설계하는 프로필 카드입니다.',
  avatarLabel,
  tags = [],
  statusLabel = 'Active',
  actionLabel = '바로가기',
  onAction,
  avatarUrl,
  ...props
}: IdentityProps) {
  const initials = avatarLabel?.trim() || name.trim().slice(0, 2).toUpperCase();

  return (
    <section
      className={cn('rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm', className)}
      {...props}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${name} 프로필 이미지`}
              className="size-16 rounded-full object-cover"
            />
          ) : (
            <div className="flex size-16 items-center justify-center rounded-full bg-primary-100 text-lg font-semibold text-primary-700">
              {initials}
            </div>
          )}

          <div>
            <p className="text-heading-small text-gray-900">{name}</p>
            <p className="text-body-medium text-gray-600">{title}</p>
          </div>
        </div>

        <div className="flex-1 lg:max-w-2xl">
          <p className="text-body-medium leading-7 text-gray-700">{description}</p>

          {tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex h-10 items-center justify-center gap-0.5 rounded-full border border-gray-200 bg-white px-3 text-base leading-6 font-normal text-gray-900"
                >
                  <HashIcon className="size-4" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col items-start gap-3 lg:items-end">
          <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-label-small text-primary-700">
            {statusLabel}
          </span>

          {onAction && (
            <Button variant="outline" onClick={onAction} className="h-11 px-4 text-sm">
              <span>{actionLabel}</span>
              <ArrowRightIcon className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
