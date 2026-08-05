import ChevronDownIcon from '@/assets/icons/icon-chevron-down.svg?react';
import useDismissableOpen from '@/hooks/useDismissableOpen';
import { cn } from '@/utils/cn';

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  placeholder: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  size?: 'md' | 'sm';
}

export default function Dropdown({
  placeholder,
  options,
  value,
  onChange,
  className,
  size = 'md',
}: DropdownProps) {
  const { isOpen, setIsOpen, containerRef } = useDismissableOpen();

  const selectedLabel = options.find((option) => option.value === value)?.label;

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={cn(
          'flex w-full cursor-pointer items-center justify-between gap-2 rounded-sm border border-gray-700 bg-white font-medium whitespace-nowrap',
          size === 'sm' ? 'h-10 px-4 text-body-small' : 'h-14 px-4 text-body-large',
          selectedLabel ? 'text-gray-900' : 'text-gray-600',
        )}
      >
        {selectedLabel ?? placeholder}
        <ChevronDownIcon
          className={cn('shrink-0 text-black', size === 'sm' ? 'size-4' : 'size-6')}
        />
      </button>
      {isOpen && (
        <div
          role="listbox"
          aria-label={placeholder}
          className="absolute top-full left-0 z-20 mt-1 flex max-h-70 w-max min-w-full flex-col overflow-y-auto rounded-sm border border-gray-200 bg-white shadow-md"
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  'flex w-full cursor-pointer items-center px-4 py-3 text-left font-medium whitespace-nowrap transition-colors',
                  size === 'sm' ? 'text-body-small' : 'text-body-large',
                  isSelected ? 'bg-primary-600 text-white' : 'text-text-primary hover:bg-gray-50',
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
