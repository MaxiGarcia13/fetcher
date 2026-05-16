import type { InputHTMLAttributes } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { useId } from 'react';
import { Field } from './field';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export function Input({ className, error, ...props }: InputProps) {
  const id = useId();
  const name = props.name ?? props.id ?? id;

  return (
    <Field error={error} className={cn('border border-gray-600 rounded h-10', className)}>
      <input
        className="w-full flex-1 px-3 py-2 text-sm"
        name={name}
        {...props}
      />
    </Field>
  );
}
