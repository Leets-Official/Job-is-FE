import { useEffect, useRef, useState } from 'react';
import ChevronDownIcon from '@/assets/icons/icon-chevron-down.svg?react';
import { cn } from '@/utils/cn';

export interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectProps {
  placeholder: string;
  options: MultiSelectOption[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  className?: string;
}

export default function MultiSelect({
  placeholder,
  options,
  selectedValues,
  onToggle,
  className,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (containerRef.current?.contains(event.target as Node)) return;
      setIsOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex h-14 w-full items-center justify-between gap-2 rounded-sm border border-gray-700 bg-white px-4 text-body-large font-medium text-gray-600"
      >
        {placeholder}
        <ChevronDownIcon className="size-6 shrink-0 text-black" />
      </button>
      {isOpen && (
        <div
          role="listbox"
          aria-multiselectable
          aria-label={placeholder}
          className="absolute top-full left-0 z-20 mt-1 flex w-full flex-col overflow-hidden rounded-sm border border-gray-200 bg-white shadow-md"
        >
          {options.map((option) => {
            const isSelected = selectedValues.includes(option.value);

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => onToggle(option.value)}
                className={cn(
                  'flex w-full items-center px-4 py-3 text-left text-body-medium font-medium transition-colors',
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
