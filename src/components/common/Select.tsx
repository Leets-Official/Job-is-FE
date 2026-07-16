import { type ComponentPropsWithRef } from 'react';
import ChevronDownIcon from '@/assets/icons/icon-chevron-down.svg?react';
import FormField from '@/components/common/FormField';
import { cn } from '@/utils/cn';

type SelectProps = ComponentPropsWithRef<'select'> & {
  label?: string;
  helperText?: string;
  placeholder?: string;
};

export default function Select({
  className,
  id,
  label,
  helperText,
  placeholder,
  children,
  ...props
}: SelectProps) {
  return (
    <FormField label={label} helperText={helperText} htmlFor={id}>
      <div className="relative">
        <select
          id={id}
          required
          defaultValue=""
          className={cn(
            'h-14 w-full appearance-none rounded-sm border border-gray-700 bg-white px-4 text-body-large font-medium text-gray-900 invalid:text-gray-600 focus:border-primary-500 focus:outline-none disabled:bg-gray-200 disabled:text-gray-600',
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-4 size-6 -translate-y-1/2 text-black" />
      </div>
    </FormField>
  );
}
