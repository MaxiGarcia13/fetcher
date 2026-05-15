import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@maxigarcia/js-utils';

interface MenuItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

export function MenuItem({ onClick, children, disabled, className, ...props }: MenuItemProps) {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      className={cn(
        'flex w-full cursor-pointer items-center gap-2 p-2 text-left text-sm text-inherit transition-colors hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      onClick={(event) => {
        if (disabled) {
          return;
        }

        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
