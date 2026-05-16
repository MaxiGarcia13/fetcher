import type { ComponentProps, InputHTMLAttributes } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { useId } from 'react';
import { Field } from './field';

interface AutocompleteInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>,
  Omit<ComponentProps<typeof Field>, 'children'> {
  onChange: (value: string) => void;
  suggestions?: ReadonlyArray<string>;
  className?: string;
}

export function AutocompleteInput({
  value,
  onChange,
  suggestions = [],
  className,
  error,
  label,
  name,
  id,
  ...props
}: AutocompleteInputProps) {
  const datalistId = useId();
  const hasSuggestions = suggestions.length > 0;

  return (
    <Field
      className={
        cn(
          'relative appearance-none rounded border border-gray-600 text-sm',
          className,
        )
      }
      label={label}
      name={name}
      id={id}
      error={error}
    >
      <input
        type="text"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        list={hasSuggestions ? datalistId : undefined}
        className="h-full w-full p-2"
        {...props}
      />
      {hasSuggestions
        ? (
            <datalist id={datalistId}>
              {suggestions.map((suggestion) => (
                <option key={suggestion} value={suggestion} />
              ))}
            </datalist>
          )
        : null}
    </Field>
  );
}
