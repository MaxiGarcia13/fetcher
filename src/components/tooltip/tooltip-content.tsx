import type { HTMLAttributes, RefObject } from 'react';
import type { Coords } from '@/utils/clamp-to-viewport';
import { cn } from '@maxigarcia/js-utils';

interface TooltipContentProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'content'> {
  ref: RefObject<HTMLSpanElement>;
  coords: Coords | null;
  className?: string;
}

export function TooltipContent({
  ref,
  children,
  coords,
  className,
  ...props
}: TooltipContentProps) {
  return (
    <span
      ref={ref}
      role="tooltip"
      className={cn(
        'pointer-events-none z-1000 fixed max-w-[min(20rem,calc(100vw-16px))] px-2 py-1 text-xs',
        'wrap-break-word rounded-md border border-gray-700 bg-gray-800',
        !coords && 'invisible',
        className,
      )}
      style={{
        top: `${coords?.top ?? 0}px`,
        left: `${coords?.left ?? 0}px`,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
