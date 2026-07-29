import {
  useEffect,
  useId,
  useRef,
  type ComponentProps,
  type ComponentPropsWithRef,
  type ReactNode,
} from 'react';
import CloseIcon from '@/assets/icons/icon-close.svg?react';
import { cn } from '@/utils/cn';

interface ModalProps extends ComponentPropsWithRef<'div'> {
  title: string;
  onClose?: () => void;
  footer?: ReactNode;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Modal({
  className,
  ref,
  title,
  onClose,
  footer,
  children,
  ...props
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    const node = dialogRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    node?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose?.();
        return;
      }
      if (event.key !== 'Tab' || !node) return;
      const focusable = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div
      ref={(node) => {
        dialogRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
      className={cn(
        'flex min-h-[296px] w-full flex-col items-start rounded-md border border-gray-200 bg-white p-6 outline-none',
        className,
      )}
      {...props}
    >
      {onClose && (
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
      )}
      <div className="flex w-full flex-1 flex-col gap-4 px-4 py-2">
        <p id={titleId} className="w-full text-2xl leading-normal font-bold text-text-primary">
          {title}
        </p>
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
