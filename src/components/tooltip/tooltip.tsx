import type { ReactNode } from 'react';
import type { TooltipPosition } from './types';
import { cn } from '@maxigarcia/js-utils';
import { useState } from 'react';
import { TooltipContent } from './tooltip-content';
import { useTooltipPosition } from './use-tooltip-position';

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: TooltipPosition;
  className?: string;
  contentClassName?: string;
  disabled?: boolean;
}

export function Tooltip({
  content,
  children,
  position = 'top',
  className,
  contentClassName,
  disabled,
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerElement, setTriggerElement] = useState<HTMLDivElement | null>(null);
  const [tooltipElement, setTooltipElement] = useState<HTMLSpanElement | null>(null);

  const coords = useTooltipPosition({
    isOpen,
    position,
    triggerElement,
    tooltipElement,
  });

  const handleOpen = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleClose = () => setIsOpen(false);

  return (
    <div
      ref={setTriggerElement}
      className={cn('relative inline-flex', className)}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocus={handleOpen}
      onBlur={handleClose}
    >
      {children}
      {!disabled && isOpen && (
        <TooltipContent
          content={content}
          coords={coords}
          contentClassName={contentClassName}
          setTooltipElement={setTooltipElement}
        />
      )}
    </div>
  );
}
