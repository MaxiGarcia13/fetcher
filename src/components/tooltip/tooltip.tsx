import type { ReactNode } from 'react';
import type { TooltipPlacement } from './types';
import { cn } from '@maxigarcia/js-utils';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDismiss } from '@/hooks/use-dismiss';
import { useFloatingPosition } from '@/hooks/use-floating-position';
import { TooltipContent } from './tooltip-content';
import { getTooltipComputePlacement } from './tooltip-position';

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

  const coords = useFloatingPosition({
    isOpen,
    anchorElement: triggerElementRef,
    floatingElement: tooltipElementRef,
    computePosition: getTooltipComputePlacement(placement),
  });

  const handleOpen = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleClose = () => setIsOpen(false);

  useDismiss(handleClose, triggerElementRef, isOpen);

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
        createPortal(
          <TooltipContent
            ref={tooltipElementRef}
            children={content}
            coords={coords}
            className={cn(contentClassName)}
          />,
          document.body,
        )
      )}
    </div>
  );
}
