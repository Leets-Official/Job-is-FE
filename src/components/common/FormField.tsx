import { type ReactNode } from 'react';
import { cn } from '@/utils/cn';

type FormFieldProps = {
  label?: string;
  helperText?: string;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
};

export default function FormField({
  label,
  helperText,
  htmlFor,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label htmlFor={htmlFor} className="text-label-medium font-medium text-gray-900">
          {label}
        </label>
      )}
      {helperText && <span className="text-label-small text-gray-500">{helperText}</span>}
      {children}
    </div>
  );
}
