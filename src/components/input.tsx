import type { InputHTMLAttributes } from 'react';
import { cn } from '@maxigarcia/js-utils';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'border border-gray-600 focus:border-gray-600',
        'h-10 min-w-0 rounded px-3 py-2 text-sm outline-none',
        className,
      )}
      {...props}
    />
  );
}
