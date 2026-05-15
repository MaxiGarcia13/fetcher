import type { TooltipPlacement } from './types';
import type { ComputeFloatingPosition } from '@/hooks/use-floating-position';

export const TOOLTIP_GAP = 8;

const computeTopPosition: ComputeFloatingPosition = (anchorRect, floatingRect) => ({
  top: anchorRect.top - floatingRect.height - TOOLTIP_GAP,
  left: anchorRect.left + (anchorRect.width - floatingRect.width) / 2,
});

const computeBottomPosition: ComputeFloatingPosition = (anchorRect, floatingRect) => ({
  top: anchorRect.bottom + TOOLTIP_GAP,
  left: anchorRect.left + (anchorRect.width - floatingRect.width) / 2,
});

const computeLeftPosition: ComputeFloatingPosition = (anchorRect, floatingRect) => ({
  top: anchorRect.top + (anchorRect.height - floatingRect.height) / 2,
  left: anchorRect.left - floatingRect.width - TOOLTIP_GAP,
});

const computeRightPosition: ComputeFloatingPosition = (anchorRect, floatingRect) => ({
  top: anchorRect.top + (anchorRect.height - floatingRect.height) / 2,
  left: anchorRect.right + TOOLTIP_GAP,
});

const computeByPlacement: Record<TooltipPlacement, ComputeFloatingPosition> = {
  top: computeTopPosition,
  bottom: computeBottomPosition,
  left: computeLeftPosition,
  right: computeRightPosition,
};

export function getTooltipComputePlacement(placement: TooltipPlacement): ComputeFloatingPosition {
  return computeByPlacement[placement];
}
