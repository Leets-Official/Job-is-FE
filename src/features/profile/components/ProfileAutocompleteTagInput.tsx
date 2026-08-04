import { useState } from 'react';
import Tag from '@/components/common/Tag';

interface ProfileAutocompleteTagInputProps {
  options: string[];
  selectedValues: string[];
  onAdd: (value: string) => void;
  placeholder: string;
  ariaLabel: string;
}

export default function ProfileAutocompleteTagInput({
  options,
  selectedValues,
  onAdd,
  placeholder,
  ariaLabel,
}: ProfileAutocompleteTagInputProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [keyword, setKeyword] = useState('');
  const trimmedKeyword = keyword.trim();
  const suggestions = trimmedKeyword
    ? options.filter(
        (option) => option.includes(trimmedKeyword) && !selectedValues.includes(option),
      )
    : [];

  const addValue = (value: string) => {
    onAdd(value);
    setKeyword('');
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <Tag
        variant="add"
        label="추가"
        onClick={() => setIsAdding(true)}
        className="h-10 border-dashed text-label-large text-text-primary"
      />
    );
  }

  return (
    <div className="relative">
      <input
        type="text"
        autoFocus
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        onBlur={() => setIsAdding(false)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && trimmedKeyword) {
            event.preventDefault();
            addValue(suggestions[0] ?? trimmedKeyword);
          }
          if (event.key === 'Escape') {
            setKeyword('');
            setIsAdding(false);
          }
        }}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="h-10 w-36 rounded-full border border-gray-300 bg-white px-3 text-label-large font-normal text-text-primary outline-none focus:border-primary-500"
      />
      {trimmedKeyword && (
        <ul className="absolute top-full left-0 z-10 mt-1 flex w-60 flex-col overflow-hidden rounded-md border border-primary-500 bg-white py-1 shadow-md">
          {suggestions.map((option) => (
            <li key={option}>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => addValue(option)}
                className="block w-full px-3 py-2 text-left text-label-medium font-medium text-text-primary hover:bg-gray-100"
              >
                {option}
              </button>
            </li>
          ))}
          <li className={suggestions.length > 0 ? 'border-t border-dashed border-gray-300' : ''}>
            <button
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => addValue(trimmedKeyword)}
              className="block w-full px-3 py-2 text-left text-label-medium font-medium text-text-secondary hover:bg-gray-100"
            >
              + “{trimmedKeyword}” 그대로 추가
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
