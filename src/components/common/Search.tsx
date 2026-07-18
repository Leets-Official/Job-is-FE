import { useId, type ComponentPropsWithRef, type FormEvent } from 'react';
import SearchIcon from '@/assets/icons/icon-search.svg?react';
import TextInput from '@/components/common/TextInput';
import { cn } from '@/utils/cn';

type SearchProps = Omit<ComponentPropsWithRef<'input'>, 'onSubmit'> & {
  label?: string;
  helperText?: string;
  onSearchSubmit?: (query: string) => void;
};

export default function Search({
  className,
  id,
  label,
  helperText,
  onSearchSubmit,
  placeholder = '선택해주세요.',
  name,
  ...props
}: SearchProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputName = name ?? inputId;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!onSearchSubmit) return;
    const formData = new FormData(event.currentTarget);
    onSearchSubmit(String(formData.get(inputName) ?? ''));
  };

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <TextInput
        id={inputId}
        name={inputName}
        type="search"
        label={label}
        helperText={helperText}
        placeholder={placeholder}
        className="rounded-xl border border-gray-200 bg-white px-4 pr-12 text-body-large text-gray-900 outline-none transition focus:border-primary-500"
        {...props}
      />
      <button
        type="submit"
        aria-label="검색"
        className="absolute right-2 top-[calc(50%+1rem)] inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white transition hover:bg-primary-600"
      >
        <SearchIcon className="size-4" />
      </button>
    </form>
  );
}
