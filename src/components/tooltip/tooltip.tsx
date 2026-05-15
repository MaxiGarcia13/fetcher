import type { ReactNode } from 'react';
import type { TooltipPlacement } from './types';
import { cn } from '@maxigarcia/js-utils';
import { useRef, useState } from 'react';
import { TooltipContent } from './tooltip-content';
import { useTooltipPosition } from './use-tooltip-position';

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  placement?: TooltipPlacement;
  className?: string;
  contentClassName?: string;
  disabled?: boolean;
}

export function Tooltip({
  content,
  children,
  placement = 'top',
  className,
  contentClassName,
  disabled,
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerElementRef = useRef<HTMLDivElement>(null);
  const tooltipElementRef = useRef<HTMLSpanElement>(null);

  const coords = useTooltipPosition({
    isOpen,
    placement,
    triggerElement: triggerElementRef,
    tooltipElement: tooltipElementRef,
  });

  const handleOpen = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleClose = () => setIsOpen(false);

  return (
    <div
      ref={triggerElementRef}
      className={cn('relative inline-flex', className)}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocus={handleOpen}
      onBlur={handleClose}
    >
      {children}
      {!disabled && isOpen && (
        <TooltipContent
          ref={tooltipElementRef}
          children={content}
          coords={coords}
          className={contentClassName}
        />
      )}
    </div>
  );
}
