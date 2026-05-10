import type { ReactNode } from 'react';
import type { TooltipCoordinates } from './types';
import { cn } from '@maxigarcia/js-utils';

interface TooltipContentProps {
  content: ReactNode;
  coords: TooltipCoordinates | null;
  contentClassName?: string;
  setTooltipElement: (element: HTMLSpanElement | null) => void;
}

export function TooltipContent({
  content,
  coords,
  contentClassName,
  setTooltipElement,
}: TooltipContentProps) {
  return (
    <span
      ref={setTooltipElement}
      role="tooltip"
      className={cn(
        'pointer-events-none z-1000 fixed max-w-[min(20rem,calc(100vw-16px))] px-2 py-1 text-xs',
        'wrap-break-word rounded-md border border-gray-700 bg-gray-800',
        !coords && 'invisible',
        contentClassName,
      )}
      style={{
        top: `${coords?.top ?? 0}px`,
        left: `${coords?.left ?? 0}px`,
      }}
    >
      {content}
    </span>
  );
}
