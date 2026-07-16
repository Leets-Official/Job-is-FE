import { type ComponentProps, type ComponentPropsWithRef, type ReactNode } from 'react';
import CloseIcon from '@/assets/icons/icon-close.svg?react';
import { cn } from '@/utils/cn';

interface ModalProps extends ComponentPropsWithRef<'div'> {
  title: string;
  onClose?: () => void;
  footer?: ReactNode;
}

export default function Modal({
  className,
  ref,
  title,
  onClose,
  footer,
  children,
  ...props
}: ModalProps) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex min-h-[296px] w-full flex-col items-start rounded-md border border-gray-200 bg-white p-6',
        className,
      )}
      {...props}
    >
      <div className="flex h-6 w-full items-end justify-end">
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="flex size-6 items-center justify-center"
        >
          <CloseIcon className="size-6" />
        </button>
      </div>
      <div className="flex w-full flex-1 flex-col gap-4 px-4 py-2">
        <p className="w-full text-2xl leading-normal font-bold text-text-primary">{title}</p>
        {children}
      </div>
      {footer && <div className="flex w-full items-center justify-end gap-2 p-4">{footer}</div>}
    </div>
  );
}

export type ModalPresetProps = Pick<
  ComponentProps<typeof Modal>,
  'title' | 'onClose' | 'footer' | 'className' | 'ref'
>;
