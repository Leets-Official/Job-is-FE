import { useId, type ComponentPropsWithRef, type FormEvent } from 'react';
import SearchIcon from '@/assets/icons/icon-search.svg?react';
import FormField from '@/components/common/FormField';
import { cn } from '@/utils/cn';

type SearchProps = ComponentPropsWithRef<'input'> & {
  label?: string;
  helperText?: string;
  onSubmit?: (query: string) => void;
};

export default function Search({
  className,
  id,
  label,
  helperText,
  onSubmit,
  placeholder = '선택해주세요.',
  ...props
}: SearchProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!onSubmit) return;
    const formData = new FormData(event.currentTarget);
    onSubmit(String(formData.get(inputId) ?? ''));
  };

  return (
    <FormField id={inputId} label={label} helperText={helperText}>
      <form onSubmit={handleSubmit} className={cn('relative', className)}>
        <input
          id={inputId}
          name={inputId}
          type="search"
          placeholder={placeholder}
          className="h-14 w-full rounded-xl border border-gray-200 bg-white px-4 pr-12 text-body-large text-gray-900 outline-none transition focus:border-primary-500"
          {...props}
        />
        <button
          type="submit"
          aria-label="검색"
          className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white transition hover:bg-primary-600"
        >
          <SearchIcon className="size-4" />
        </button>
      </form>
    </FormField>
  );
}
