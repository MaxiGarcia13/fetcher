import type { ButtonHTMLAttributes } from 'react';
import type { ButtonSize, ButtonVariant } from './button-styles';
import { cn } from '@maxigarcia/js-utils';
import { buttonBaseClassName, sizeClassName, variantClassName } from './button-styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = 'default',
  className,
  type = 'button',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonBaseClassName, variantClassName[variant], sizeClassName[size], className)}
      {...props}
    />
  );
}
