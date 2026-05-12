import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@maxigarcia/js-utils';

type ButtonVariant = 'default' | 'primary' | 'success';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClassName: Record<ButtonVariant, string> = {
  default:
    'border border-gray-600 bg-transparent text-white hover:bg-gray-600 focus-visible:border-gray-500 focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900',
  primary:
    'border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900',
  success:
    'border border-transparent bg-green-600 text-white hover:bg-green-700 focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900',
};

export function Button({
  variant = 'default',
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex h-10 items-center justify-center gap-2 cursor-pointer rounded px-4 text-sm font-medium outline-none transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-gray-600',
        'transition-all duration-200 ease-in-out',
        variantClassName[variant],
        className,
      )}
      {...props}
    />
  );
}
