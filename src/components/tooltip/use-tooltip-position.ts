import type { TooltipCoordinates, TooltipPlacement } from './types';
import { useFloatingPosition } from '@/hooks/use-floating-position';
import { getTooltipComputePlacement } from './tooltip-position';

interface UseTooltipPositionOptions {
  isOpen: boolean;
  placement: TooltipPlacement;
  triggerElement: HTMLDivElement | null;
  tooltipElement: HTMLSpanElement | null;
}

export function useTooltipPosition({
  isOpen,
  placement,
  triggerElement,
  tooltipElement,
}: UseTooltipPositionOptions): TooltipCoordinates | null {
  return useFloatingPosition({
    isOpen,
    anchorElement: triggerElement,
    floatingElement: tooltipElement,
    computePosition: getTooltipComputePlacement(placement),
  });
}
