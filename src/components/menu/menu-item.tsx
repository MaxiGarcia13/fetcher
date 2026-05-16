import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@maxigarcia/js-utils';

interface MenuItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode;
  disabled?: boolean;
  selected?: boolean;
  className?: string;
}

export function MenuItem({ onClick, children, disabled, selected, className, ...props }: MenuItemProps) {
  return (

    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      aria-selected={selected}
      tabIndex={disabled ? -1 : 0}
      className={cn(
        'flex w-full cursor-pointer items-center gap-2 p-2 text-left text-sm text-inherit transition-colors hover:bg-app-bg-hover disabled:cursor-not-allowed disabled:opacity-50',
        selected && 'bg-app-bg-muted text-sky-300 hover:bg-app-bg-hover',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
