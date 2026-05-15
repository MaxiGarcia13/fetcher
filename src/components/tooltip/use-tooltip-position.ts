import type { RefObject } from 'react';
import type { TooltipPlacement } from './types';
import type { Coords } from '@/utils/clamp-to-viewport';
import { useFloatingPosition } from '@/hooks/use-floating-position';
import { getTooltipComputePlacement } from './tooltip-position';

interface UseTooltipPositionOptions {
  isOpen: boolean;
  placement: TooltipPlacement;
  triggerElement: RefObject<HTMLDivElement>;
  tooltipElement: RefObject<HTMLSpanElement>;
}

export function useTooltipPosition({
  isOpen,
  placement,
  triggerElement,
  tooltipElement,
}: UseTooltipPositionOptions): Coords | null {
  return useFloatingPosition({
    isOpen,
    anchorElement: triggerElement,
    floatingElement: tooltipElement,
    computePosition: getTooltipComputePlacement(placement),
  });
}
